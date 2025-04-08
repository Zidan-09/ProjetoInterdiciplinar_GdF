import { Patient, VitalSigns } from "../models/patient";

export class HospitalServices {
    triage(patient: Patient) {
        let vitalSigns: VitalSigns = new VitalSigns(1, 1, 1, 1, 1)
        patient.vitalSigns = vitalSigns;
        patient.severity = 'Non-urgent';
    }
}