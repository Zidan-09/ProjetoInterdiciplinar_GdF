type EmployeeStatus = 'active' | 'onLeave' | 'Resigned'

interface Employee{
    registrationNumber: number;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    dob: Date;
    address: string;
    hireDate: Date;
    workShift: string;
    status: EmployeeStatus;
    salary: number;
    cnesCode: string;
};

export interface Doctor extends Employee {
    crm: string;
    specialty: string;
    professionalType: string;
    weeklyHours: number;
};

export interface Nurse extends Employee {
    coren: string;
    department: string;
    specialty: string;
    weeklyHours: number;
};

export interface Recepcionist extends Employee {
    weeklyHours: number;
}

export interface Admin extends Employee {
    accessLevel: string;
    weeklyHours: number;
};

export interface User {
    user_id: number;
    username: string;
    password: string;
    lastLogin: Date;
    isActive: boolean;
    permitions: string;
}