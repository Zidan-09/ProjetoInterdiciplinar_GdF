class Consult {
    doctor_id: number;
    patient_id: number;
    checkInConsult: Date;
    checkOutConsult: Date | null;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
  
    constructor(doctor_id: number, patient_id: number) {
        this.doctor_id = doctor_id;
        this.patient_id = patient_id;
        this.checkInConsult = new Date();
        this.checkOutConsult = null;
        this.diagnosis = null;
        this.prescriptions = null;
        this.notes = null;
    }
};

export { Consult }