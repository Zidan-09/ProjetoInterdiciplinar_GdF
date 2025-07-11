import { EmployeeStatus, EmployeeType } from "../utils/enuns/generalEnuns";

interface Employee{
    registrationNumber: number;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    dob: Date;
    address: string;
    workShift: string;
    status: EmployeeStatus;
    salary: number;
    cnesCode: string;
    weeklyHours: number;
    accessLevel: EmployeeType;
};

interface Doctor extends Employee {
    crm: string;
    specialty: string;
};

interface Nurse extends Employee {
    coren: string;
    department: string;
    specialty: string;
};

interface User {
    username: string;
    password: string;
}       

interface ConfirmUser {
    data: string
    user: User;
}

export { Employee, Doctor, Nurse, ConfirmUser, User }