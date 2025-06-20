interface VitalSigns {
    bloodPreassure: { systolicPreassure: number; diastolicPreassure: number };
    heartRate: number;
    respiratoryRate: number;
    bodyTemperature: number;
    oxygenSaturation: number;
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

interface EndConsult {
    careFlow_id: number;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
};

export { VitalSigns, EndTriage, ChangeTriageCategory, EndConsult }