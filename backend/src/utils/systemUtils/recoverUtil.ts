import { openDb } from "../../db";
import { EndTriage } from "../../entities/careFlow";

export async function searchTriage(careFlow_id: number) {
    const db = await openDb();

    try {
        const Triage = await db.get('SELECT Triage.* FROM CareFlow JOIN Triage ON Triage.triage_id = CareFlow.id WHERE CareFlow.id = ?', [careFlow_id]);
        const data: EndTriage = {
            careFlow_id: careFlow_id,
            vitalSigns: {
                bloodPreassure: {
                    systolicPreassure: Triage.vitalSigns.bloodPreassure.systolicPreassure,
                    diastolicPreassure: Triage.vitalSigns.bloodPreassure.diastolicPreassure
                },
                heartRate: Triage.vitalSigns.heartRate,
                respiratoryRate: Triage.vitalSigns.respiratoryRate,
                bodyTemperature: Triage.vitalSigns.bodyTemperature,
                oxygenSaturation: Triage.vitalSigns.oxygenSaturation
            },
            triageCategory: Triage.triageCategory,
            symptoms: Triage.symptoms,
            painLevel: Triage.painLevel
        }
        return data;
        
    } catch (error) {
        console.error(error);
    }
}