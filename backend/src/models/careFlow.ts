import { Patient } from "./patient";

export type Status = 'In triage queue'| 'In consult queue' | 'In consult' | 'Was treated' | 'Left before consult'
export type TriageCategory = 'Non-Urgent' | 'Standard' | 'Urgent' | 'VeryUrgent' | 'Immediate'

export interface VitalSigns {
    bloodPreassure: { systolicPreassure: number; diastolicPreassure: number };
    heartRate: number;
    respiratoryRate: number;
    bodyTemperature: number;
    oxygenSaturation: number;
};

export interface Reception {
    receptionist_id: number;
    patient: Patient
};

export interface Triage {
    patient_id: number;
    nurse_id: number;
    vitalSigns: VitalSigns;
    triageCategory: TriageCategory;
    symptoms:string[]
    painLevel: number;
};

export interface CallsConsult {
    patient_id: number;
    patient_name: string;
    calls: number
};

export interface StartConsult {
    doctor_id: number;
    patient_id: number;
    confirm: boolean;
};

export interface EndConsult {
    id: number;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
}; 