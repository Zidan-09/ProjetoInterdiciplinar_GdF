import { Doctor } from "../models/hospitalStaff";

export class Consult {
    doctor: Doctor;
    checkInConsult: Date;
    checkOutConsult: Date | null;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;

    constructor(doctor: Doctor) {
        this.doctor = doctor;
        this.checkInConsult = new Date();
        this.checkOutConsult = null;
        this.diagnosis = null;
        this.prescriptions = null;
        this.notes = null;
    }
}