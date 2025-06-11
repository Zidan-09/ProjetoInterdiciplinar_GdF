import { Patient } from "./patient";

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
};

interface StartTriage {
    careFlow_id: number;
    nurse_id: number;
};

interface EndTriage {
    careFlow_id: number;
    vitalSigns: VitalSigns;
    triageCategory: string;
    symptoms: string[];
    painLevel: number;
};

interface ChangeTriageCategory {
    careFlow_id: number;
    newTriageCategory: string;
}

interface StartConsult {
    careFlow_id: number;
    doctor_id: number;
    confirm: boolean;
};

interface EndConsult {
    careFlow_id: number;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
};

export { VitalSigns, CareFlow, StartTriage, EndTriage, ChangeTriageCategory, StartConsult, EndConsult }