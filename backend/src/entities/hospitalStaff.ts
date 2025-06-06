import { EmployeeStatus, EmployeeType } from "../utils/personsUtils/generalEnuns";

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
    accessLevel: number;
    role: EmployeeType;
};

interface Doctor extends Employee {
    crm: string;
    specialty: string;
    weeklyHours: number;
};

interface Nurse extends Employee {
    coren: string;
    department: string;
    specialty: string;
    weeklyHours: number;
};

interface User {
    username: string;
    password: string;
}       

interface ConfirmUser<T extends Employee | Nurse | Doctor> {
    data: T
    user: User;
}

interface LoginData {
    email: string;
    password: string
}
export { Employee, Doctor, Nurse, ConfirmUser, User, LoginData }