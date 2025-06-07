import { openDb } from "../../../db";
import { Periods } from "../../../utils/systemUtils/AdminResponses";

export const CareFlowReports = {
    async timeConsult(period: Periods) {
        const db = await openDb();

        const date: Date = new Date();
        let initDate: number;
        let endDate: number;

        switch (period) {
            case Periods.Day:
                initDate = date.setHours(0, 0, 0, 0);
                endDate = date.setHours(23, 59, 59, 999);
                break;
            case Periods.Week:
                initDate = date.setDate(1)
                endDate = date.setHours(23, 59, 59, 999);
                break;
            case Periods.Month:
                initDate = date.setMonth(1, 1)
                endDate = date.setHours(23, 59, 59, 999);
                break;
            case Periods.Year:
                initDate = date.setFullYear(2025, 1, 1)
                endDate = date.setHours(23, 59, 59, 999);
                break;
        }

        console.log(initDate, endDate)
    },

    async timeTriage() {
        const db = await openDb();
    },

    async showAllCareFlows() {
        const db = await openDb();

        try {
            const careFlows = await db.all('SELECT CareFlow.*, Triage.*, Consult.* FROM CareFlow LEFT JOIN Triage ON CareFlow.id = Triage.triage_id LEFT JOIN Consult ON CareFlow.id = Consult.consult_id');

            for (let careFlow of careFlows) {
                try {
                    careFlow.symptoms = JSON.parse(careFlow.symptoms);
                    careFlow.prescriptions = JSON.parse(careFlow.prescriptions);
                } catch {
                    careFlow.symptoms = []
                    careFlow.prescriptions = []
                }
            }

            return careFlows

        } catch (error) {
            console.error(error);
        }
    },
}