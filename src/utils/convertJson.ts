import fs from 'fs';
import { Patient } from '../models/patient';

export class Convert {
    static JsonToPatient(json) {
        const file = fs.readFileSync(json, 'utf-8');
        const patient = JSON.parse(file);
        patient.dob = new Date(patient.dob);
        return patient;
    }

    static JsonToTriage(json): Patient {
        const file = fs.readFileSync(json, 'utf-8');
        const patient = JSON.parse(file);
        return patient;
    }
}