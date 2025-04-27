import { Doctor } from "../models/hospitalStaff";
import { Triage } from "./triage";

export class Consult {
    id: number;
    triage: Triage;
    doctor: Doctor;
    checkInConsult: Date;
    checkOutConsult: Date | null;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;



    constructor(triage: Triage, doctor: Doctor) {
        this.id = 0;
        this.triage = triage;
        this.doctor = doctor;
        this.checkInConsult = new Date();
        this.checkOutConsult = null;
        this.diagnosis = null;
        this.prescriptions = null;
        this.notes = null;
    }
}