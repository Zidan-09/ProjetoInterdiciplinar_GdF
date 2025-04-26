import { Doctor } from "../models/hospitalStaff";
import { Triage } from "./triage";

export class Consult {
    id: number;
    triage: Triage;
    doctor: Doctor;
    checkInConsult: Date;
    checkOutConsult: Date | null;
    diagnosis: string;
    prescriptions: string[];
    notes: string;



    constructor(triage: Triage, doctor: Doctor, diagnosis: string, prescriptions: string[], notes: string) {
        this.id = 0;
        this.triage = triage;
        this.doctor = doctor;
        this.checkInConsult = new Date();
        this.checkOutConsult = null;
        this.diagnosis = diagnosis;
        this.prescriptions = prescriptions;
        this.notes = notes;
    }
}