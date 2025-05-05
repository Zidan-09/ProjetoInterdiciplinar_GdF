import { Patient } from "../models/patient";

export class NodeTriage {
    patient: Patient['name'];
    pointer: undefined | NodeTriage;

    constructor(patientName: Patient['name']) {
        this.patient = patientName;
        this.pointer = undefined;
    }
}