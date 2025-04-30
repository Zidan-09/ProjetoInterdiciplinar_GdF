import { Patient } from "../models/patient";

export class NoTriage {
    patient: Patient['name'];
    pointer: null | NoTriage;

    constructor(patientName: Patient['name']) {
        this.patient = patientName;
        this.pointer = null;
    }
}