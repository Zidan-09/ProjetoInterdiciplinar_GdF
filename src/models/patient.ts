type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated'
type Severity = 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'

export class VitalSigns {
    bloodPreassure: number;
    heartRate: number;
    respiratoryRate: number;
    bodyTemperature: number;
    oxygenSaturation: number;

    constructor(bloodPreassure: number, heartRate: number, respiratoryRate: number, bodyTemperature: number, oxygenSaturation: number) {
        this.bloodPreassure = bloodPreassure;
        this.heartRate = heartRate;
        this.respiratoryRate = respiratoryRate;
        this.bodyTemperature = bodyTemperature;
        this.oxygenSaturation = oxygenSaturation;
    }
}

export class Patient {
    name: string;
    dob: Date;
    cpf: undefined | string;
    contact: string;
    checkIn: Date;
    status: Status;
    vitalSigns: VitalSigns | undefined;
    severity: Severity | undefined;
    simptoms: undefined | string[];

    constructor(name: string, dob: Date, cpf: string, contact: string) {
        this.name = name;
        this.dob = dob;
        this.cpf = cpf;
        this.contact = contact;
        this.checkIn = new Date();
        this.status = 'In triage queue'
        this.vitalSigns = undefined;
        this.severity = undefined;
        this.simptoms = undefined;
    }
}