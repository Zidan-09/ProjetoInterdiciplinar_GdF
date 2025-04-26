import { Doctor } from "../models/hospitalStaff";
import { Triage } from "./triage";

export class consult {
    id: number;
    triage: Triage;
    doctor: Doctor;
    checkInConsult: Date;
    checkOutConsult: Date | null;
    


    constructor(triage: Triage, doctor: Doctor, ) {
        this.id = 0;
        this.triage = triage;
        this.doctor = doctor;
        this.checkInConsult = new Date();
        this.checkOutConsult = null;
    }
}