interface VitalSigns {
    bloodPreassure: { systolicPreassure: number; diastolicPreassure: number };
    heartRate: number;
    respiratoryRate: number;
    bodyTemperature: number;
    oxygenSaturation: number;
};

interface EndTriage {
    vitalSigns: VitalSigns;
    triageCategory: string;
    symptoms: string[];
    painLevel: number;
};

interface ChangeTriageCategory {
    patient_name: string;
    newTriageCategory: string;
}

interface EndConsult {
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
};

export { VitalSigns, EndTriage, ChangeTriageCategory, EndConsult }