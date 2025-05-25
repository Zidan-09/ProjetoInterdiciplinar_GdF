type EmployeeStatus = 'active' | 'onLeave' | 'Resigned'
type Role = 'Doctor' | 'Nurse' | 'Receptionist' | 'Admin'

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

interface Receptionist extends Employee {
    weeklyHours: number;
}

interface Admin extends Employee {
    accessLevel: string;
    weeklyHours: number;
};

interface User {
    username: string;
    password: string;
}       

interface ConfirmUser<T extends Receptionist | Nurse | Doctor | Admin> {
    data: T
    user: User;
}

interface LoginData {
    email: string;
    password: string
}
export { Doctor, Nurse, Receptionist, Admin, ConfirmUser, User, LoginData }