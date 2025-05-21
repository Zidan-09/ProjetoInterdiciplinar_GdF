export class Consult {
    private doctor_id: number;
    private patient_id: number;
    private diagnosis: string | null;
    private prescriptions: string[] | null;
    private notes: string | null;
  
    constructor(doctor_id: number, patient_id: number) {
        this.doctor_id = doctor_id;
        this.patient_id = patient_id;
        this.diagnosis = null;
        this.prescriptions = null;
        this.notes = null;
    }

    getIds(): number[] {
        return [this.patient_id, this.doctor_id]
    };
};