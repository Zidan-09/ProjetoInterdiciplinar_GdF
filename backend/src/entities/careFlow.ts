import { Patient } from "./patient";

enum Status {
    WaitingTriage = 'waiting_triage',
    WaitingConsultation = 'waiting_consultation',
    InConsultation = 'In consult',
    Attended  = 'attended',
    Canceled = 'canceled',
    NoShow = 'no_show'
}

enum TriageCategory {
    Immediate = 'immediate',
    VeryUrgent = 'very_urgent',
    Urgent = 'urgent',
    Standard = 'standard',
    NonUrgent = 'non_urgent'
}

interface VitalSigns {
    bloodPreassure: { systolicPreassure: number; diastolicPreassure: number };
    heartRate: number;
    respiratoryRate: number;
    bodyTemperature: number;
    oxygenSaturation: number;
};

interface CareFlow {
    receptionist_id: number;
    patient: Patient
    time: Date;
    status: Status;
};

interface Triage {
    careFlow_id: number;
    nurse_id: number;
    vitalSigns: VitalSigns;
    triageCategory: TriageCategory;
    symptoms:string;
    painLevel: number;
};

interface ChangeTriageCategory {
    careFlow_id: number;
    newTriageCategory: TriageCategory;
}

interface CallsConsult {
    careFlow_id: number
    patient_name: string;
    calls: number
};

interface StartConsult {
    careFlow_id: number;
    doctor_id: number;
    confirm: boolean;
};

interface EndConsult {
    careFlow_id: number;
    diagnosis: string | null;
    prescriptions: string | null;
    notes: string | null;
};

export { Status, TriageCategory, VitalSigns, CareFlow, Triage, ChangeTriageCategory, CallsConsult, StartConsult, EndConsult }