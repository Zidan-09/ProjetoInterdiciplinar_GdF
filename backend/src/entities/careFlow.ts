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

export interface CareFlow {
    receptionist_id: number;
    patient: Patient
    time: Date;
    status: Status;
};

export interface Triage {
    careFlow_id: number;
    nurse_id: number;
    vitalSigns: VitalSigns;
    triageCategory: TriageCategory;
    symptoms:string;
    painLevel: number;
};

export interface CallsConsult {
    careFlow_id: number
    patient_name: string;
    calls: number
};

export interface StartConsult {
    careFlow_id: number;
    doctor_id: number;
    confirm: boolean;
};

export interface EndConsult {
    careFlow_id: number;
    diagnosis: string | null;
    prescriptions: string | null;
    notes: string | null;
}; 