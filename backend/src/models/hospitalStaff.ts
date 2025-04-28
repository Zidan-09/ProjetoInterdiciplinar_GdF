type JobTitle = 'Doctor' | 'Nurse' | 'Recepcionist' | 'Administrator'

class Employee {
    registrationNumber: number;
    name: string;
    cpf: string;
    contacts: string[];
    hireDate: Date;
    shift: string;
    salary: number;
    cnesCode: string;

    constructor(name: string, cpf: string, contacts: string[], registrationNumber: number, hireDate: Date, shift: string, salary: number, cnesCode: string) {
        this.name = name;
        this.cpf = cpf;
        this.contacts = contacts;
        this.registrationNumber = registrationNumber;
        this.hireDate = hireDate;
        this.shift = shift;
        this.salary = salary;
        this.cnesCode = cnesCode;

    }
}

export class Doctor extends Employee {
    id: number;
    crm: string;
    specialty: string;
    weeklyHours: number;
    onDuty: Boolean;

    constructor(name: string, cpf: string, contacts: string[], registrationNumber: number, hireDate: Date, shift: string, salary: number, cnesCode: string, crm: string, speciality: string, weeklyHours: number) {
        super(name, cpf, contacts, registrationNumber, hireDate, shift, salary, cnesCode);
        this.id = 0;
        this.crm = crm;
        this.specialty = speciality;
        this.weeklyHours = weeklyHours;
        this.onDuty = false;
    }
}

export class Nurse extends Employee {
    id: number;
    coren: string;
    department: string;
    roleType: string;
    weeklyHours: number;
    onDuty: Boolean;

    constructor(name: string, cpf: string, contacts: string[], registrationNumber: number, hireDate: Date, shift: string, salary: number, cnesCode: string, coren: string, department: string, roleType: string, weeklyHours: number) {
        super(name, cpf, contacts, registrationNumber, hireDate, shift, salary, cnesCode);
        this.id = 0;
        this.coren = coren;
        this.department = department;
        this.roleType = roleType;
        this.weeklyHours = weeklyHours;
        this.onDuty = false;
    }
}

export class Recepcionist extends Employee {
    id: number;
    weeklyHours: number;

    constructor(name: string, cpf: string, contacts: string[], registrationNumber: number, hireDate: Date, shift: string, salary: number, cnesCode: string, weeklyHours: number) {
        super(name, cpf, contacts, registrationNumber, hireDate, shift, salary, cnesCode);
        this.id = 0;
        this.weeklyHours = weeklyHours;
    }
}

export class Administrator extends Employee {
    id: number;
    lastLogin: Date | undefined;

    constructor(name: string, cpf: string, contacts: string[], registrationNumber: number, hireDate: Date, shift: string, salary: number, cnesCode: string) {
        super(name, cpf, contacts, registrationNumber, hireDate, shift, salary, cnesCode);
        this.id = 0;
        this.lastLogin = undefined;
    }
}