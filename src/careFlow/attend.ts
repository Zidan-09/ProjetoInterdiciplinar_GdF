import { Recepcionist } from "../models/hospitalStaff";
import { Patient, Status } from "../models/patient";

export class Attend {
    patient: Patient;
    recepcionist: Recepcionist;
    checkIn: Date;
    status: Status;

    constructor(patient: Patient, recepcionist: Recepcionist) {
        this.patient = patient;
        this.recepcionist = recepcionist;
        this.checkIn = new Date();
        this.status = 'In triage queue';
    }
}