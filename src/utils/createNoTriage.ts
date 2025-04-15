import { Patient } from "../models/patient";

export class NoTriage {
    patient: Patient;
    pointer: null | NoTriage;

    constructor(patient: Patient) {
        this.patient = patient;
        this.pointer = null;
    }
}