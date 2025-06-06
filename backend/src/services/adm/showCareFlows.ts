import { openDb } from "../../db";

export async function showCareFlows(): Promise<[boolean, any]> {
    const db = await openDb();

    try {
        const careFlows = await db.all('SELECT CareFlow.*, Triage.nurse_id, Triage.systolicPreassure, Triage.diastolicPreassure, Triage.heartRate, Triage.respiratoryRate, Triage.bodyTemperature, Triage.oxygenSaturation, Triage.painLevel, Triage.symptoms, Triage.triageCategory, Consult.doctor_id, Consult.checkInConsult, Consult.checkOutConsult, Consult.diagnosis, Consult.prescriptions, Consult.notes FROM CareFlow LEFT JOIN Triage ON CareFlow.id = Triage.triage_id LEFT JOIN Consult ON CareFlow.id = Consult.consult_id');

        for (let careFlow of careFlows) {
            try {
                careFlow.symptoms = JSON.parse(careFlow.symptoms);
                careFlow.prescriptions = JSON.parse(careFlow.prescriptions);
            } catch {
                careFlow.symptoms = []
                careFlow.prescriptions = []
            }
        }

        return [true, careFlows]

    } catch (error) {
        console.error(error);
        return [false, 1]
    }
}