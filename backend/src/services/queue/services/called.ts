import { CallsConsult } from "../../../entities/careFlow";
import { NodeConsult } from "../../../utils/createNode";

class Calleds {
    private calleds: CallsConsult[];

    constructor() {
        this.calleds = [];
    }

    public insert(node: NodeConsult): CallsConsult {
        const calledType: CallsConsult = {
            careFlow_id: node.triage.careFlow_id,
            patient_name: node.patient_name,
            calls: 1
        };
        this.calleds.push(calledType);
        return calledType;
    };

    public searchCalled(id: number): [CallsConsult, string] | string {
        let result: string | CallsConsult = 'Paciente não encontrado';
        for (let i of this.calleds) {
            if (i.careFlow_id == id) {
                result = i;
                break
            }
        }
        if (typeof result != 'string') {
            result.calls++;

            const temp: CallsConsult = result;

            if (result.calls > 3) {
                const index: number = this.calleds.indexOf(result);
                this.calleds.splice(index, 1);
                result = 'Chame o próximo'
            } else {
                result = 'Paciente chamado novamente'
                return [temp, result];
            }
        }
        return result;
    };
}

export const calledsList: Calleds = new Calleds();