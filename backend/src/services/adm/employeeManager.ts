import { Employee, Nurse, Doctor, User } from "../../entities/hospitalStaff";
import { ValidateRegister } from "../../utils/personsUtils/validators";
import { db } from "../../db";
import { Hash, Jwt } from "../../utils/systemUtils/security"
import { sendEmail } from "../../utils/personsUtils/email";
import { EmployeeType } from "../../utils/enuns/generalEnuns";
import { AdminResponses, EmployeeResponses } from "../../utils/enuns/allResponses";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const EmployeeManager = {
    async registerEmployee<T extends Employee | Nurse | Doctor>(employeeData: T): Promise<EmployeeResponses> {
        const valid = await ValidateRegister.verifyEmployee(employeeData);

        if (valid) {     
            const token: string = Jwt.generateRegisterToken(employeeData);
            const result = await sendEmail.auth(employeeData.email, token);

            if (result) {
                return EmployeeResponses.AwaitingConfirmation;
            } else {
                return EmployeeResponses.Error
            }


        } else {
            return EmployeeResponses.AlreadyRegistered;
        }
    },

    async authAccount<T extends Employee | Nurse | Doctor>(data: any, userData: User): Promise<EmployeeResponses> {
        const employeeData: T = data;

        const valid: boolean | undefined = await ValidateRegister.verifyEmployee(employeeData);

        if (valid) {
            try {
                const [employee] = await db.execute<ResultSetHeader>("INSERT INTO Employee (registrationNumber, name, cpf, email, phone, dob, address, hireDate, workShift, status, salary, cnesCode, weeklyHours, accessLevel) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?, ?, ?)", [employeeData.registrationNumber, employeeData.name, employeeData.cpf, employeeData.email, employeeData.phone, employeeData.dob, employeeData.address, employeeData.workShift, employeeData.status, employeeData.salary, employeeData.cnesCode, employeeData.weeklyHours, employeeData.accessLevel]);
                const employee_id = employee.insertId;
                await db.execute('INSERT INTO User (user_id, username, password) VALUES (?, ?, ?)', [employee_id, userData.username, await Hash.hash(userData.password)])
                
                switch (employeeData.accessLevel) {
                    case EmployeeType.Doctor:
                        const doctorData = employeeData as Doctor;
                        await db.execute('INSERT INTO Doctor (id, crm, specialty, onDuty) VALUES (?, ?, ?, ?)', [employee_id, doctorData.crm, doctorData.specialty, 0]);
                        break;

                    case EmployeeType.Nurse:
                        const nurseData = employeeData as Nurse;
                        await db.execute('INSERT INTO Nurse (id, coren, department, speciality, onDuty) VALUES (?, ?, ?, ?, ?)', [employee_id, nurseData.coren, nurseData.department, nurseData.specialty, 0]);
                        break;
                }

                return EmployeeResponses.EmployeeRegistered;

            } catch (error) {
                console.error(error)
                return EmployeeResponses.Error
            }  
        } else {
            return EmployeeResponses.RegistrationInProgress
        }
    },
    
    async editEmployee<T extends Employee | Nurse | Doctor>(newUserData: T): Promise<AdminResponses|void> {
        try {
            const [employee] = await db.execute<RowDataPacket[]>('SELECT * FROM Employee WHERE registrationNumber = ? AND name = ? AND cpf = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf]);
            const employee_id = employee[0].id;
            await db.execute('UPDATE Employee SET registrationNumber = ?, name = ?, cpf = ?, email = ?, phone = ?, dob = ?, address = ?, hireDate = ?, workShift = ?, status = ?, salary = ?, cnesCode = ?, weeklyHours = ?, accessLevel = ? WHERE id = ?', [newUserData.registrationNumber, newUserData.name, newUserData.cpf, newUserData.email, newUserData.phone, newUserData.dob, newUserData.address, newUserData.workShift, newUserData.status, newUserData.salary, newUserData.cnesCode, newUserData.weeklyHours, newUserData.accessLevel, employee_id]);

            switch (newUserData.accessLevel) {
                case EmployeeType.Doctor:
                    const doctorData = newUserData as Doctor;
                    await db.execute('UPDATE Doctor SET crm = ?, specialty = ? WHERE id = ?', [doctorData.crm, doctorData.specialty, employee_id]);
                    break;
                case EmployeeType.Nurse:
                    const nurseData = newUserData as Nurse;
                    await db.execute('UPDATE Nurse SET coren = ?, department = ?, specialty = ? WHERE id = ?', [nurseData.coren, nurseData.department, nurseData.specialty, employee_id]);
                    break;
            }
            return AdminResponses.EmployeeEdited;

        } catch (error) {
            console.error(error)
        } 
    },

    async delete(data: Employee): Promise<AdminResponses|undefined> {
        try {
            const [row] = await db.execute<RowDataPacket[]>('SELECT id FROM Employee WHERE name = ? AND cpf = ?', [data.name, data.cpf]);

            if (!row.length) {
                return AdminResponses.EmployeeNotFound
            }

            const id = row[0];
            const [result] = await db.execute<ResultSetHeader>('DELETE FROM Employee WHERE id = ?', [id]);

            if (result.affectedRows > 0) {
                return AdminResponses.DeletedEmployee;
            } else {
                return AdminResponses.DeleteEmployeeFailed;
            }

        } catch (error) {
            console.error(error);
        }
    },
    
    async showEmployeers(employeeType: EmployeeType): Promise<RowDataPacket[]|undefined> {
        const employee: string = employeeType[0].toLowerCase() + employeeType.slice(1);

        try {
            if (employee === EmployeeType.Receptionist || employee === EmployeeType.Admin) {
                const [employers] = await db.execute<RowDataPacket[]>('SELECT * FROM Employee WHERE accessLevel = ?', [employee]);
                return employers;
                
            } else {
                const employee: string = employeeType[0].toUpperCase() + employeeType.slice(1);
                const [employers] = await db.execute<RowDataPacket[]>(`SELECT Employee.*, ${employee}.* FROM ${employee} JOIN Employee ON Employee.id = ${employee}.id`);
                return employers;
            }

        } catch (error) {
            console.error(error);
        }
    }
}