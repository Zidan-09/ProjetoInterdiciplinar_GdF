import { RecepQueue, TriageQueue, ConsultQueue } from "../../models/queue";
import { Triage } from "../../models/careFlow";

export class PatientCaller {
    static callNextRecep(): string {
        if (RecepQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = RecepQueue.firstPointer;
            const next = call?.pointer ?? null;

            RecepQueue.firstPointer = next;

            RecepQueue.qtyPatients--;
            return `Senha: ${call?.ticket}`
        }
    };

    static callNextTriage(): string {
        if (TriageQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = TriageQueue.firstPointer;
            const next = call?.pointer ?? null;

            TriageQueue.firstPointer = next;

            TriageQueue.qtyPatients--;
            return `${call!.patient_name}, vá para a triagem!`
        }
    };

    static callNextConsult(): Triage | string {
        if (ConsultQueue.qtyPatients == 0) {
            return 'Fila vazia'
        } else {
            const call = ConsultQueue.firstPointer;
            const next = call?.pointer;

            ConsultQueue.firstPointer = next ?? null;

            ConsultQueue.qtyPatients--;
            return call!.triage
        }
    };
}