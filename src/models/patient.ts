type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated'
type Severity = undefined | 'Non-urgent' | 'Low-urgency' | 'Urgent' | 'Very-urgent' | 'Immediate'

export class Patient {
    name: string;
    dob: Date;
    cpf: undefined | string;
    checkIn: Date;
    status: Status;
    severity: Severity;
    simptoms: undefined | string[];

    constructor(name: string, dob: Date, cpf: string) {
        this.name = name;
        this.dob = dob;
        this.cpf = cpf;
        this.checkIn = new Date();
        this.status = 'In triage queue'
        this.severity = undefined;
        this.simptoms = undefined;
    }
}