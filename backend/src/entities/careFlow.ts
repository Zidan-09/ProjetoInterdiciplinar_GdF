interface VitalSigns {
    bloodPressure: { systolicPressure: number; diastolicPressure: number };
    heartRate: number;
    respiratoryRate: number;
    bodyTemperature: number;
    oxygenSaturation: number;
};

interface CallTriage {
    careFlow_id: number;
    patient_name: string;
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

interface CallConsult {
    careFlow_id: number;
    patient_name: string;
    triage: EndTriage;
};

interface EndConsult {
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
};

export { VitalSigns, CallTriage, EndTriage, ChangeTriageCategory, CallConsult, EndConsult }