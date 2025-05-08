class Consult {
    id: number | null;
    doctor_id: number;
    patient_id: number;
    checkInConsult: Date;
    checkOutConsult: Date | null;
    diagnosis: string | null;
    prescriptions: string[] | null;
    notes: string | null;
    status: string;
  
    constructor(doctor_id: number, patient_id: number) {
        this.id = null;
        this.doctor_id = doctor_id;
        this.patient_id = patient_id;
        this.checkInConsult = new Date();
        this.checkOutConsult = null;
        this.diagnosis = null;
        this.prescriptions = null;
        this.notes = null;
        this.status = 'In Consult';
    }
};

export { Consult }