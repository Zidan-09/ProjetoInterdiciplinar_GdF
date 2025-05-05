import { Patient } from "./patient";

export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated' | 'Left before consult'
export type TriageCategory = 'Non-Urgent' | 'Standard' | 'Urgent' | 'VeryUrgent' | 'Immediate'

export interface Reception {
    recepcionist_id: number;
    patient: Patient
    checkIn: Date;
};

export interface Triage {
    patient: Reception['patient']['name'];
    nurse_id: number;
    vitalSigns: undefined | {
            bloodPreassure: {
                systolicPreassure: number;
                diastolicPreassure: number;
            };
            heartRate: number;
            respiratoryRate: number;
            bodyTemperature: number;
            oxygenSaturation: number;
        };
    triageCategory: TriageCategory;
    simptoms: string[];
    painLevel: number;
};

export interface StartConsult {
    doctor_id: number;
    confirm: Boolean;
};

export interface EndConsult {
    consult_id: number;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
};