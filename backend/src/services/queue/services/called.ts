import { CallsConsult } from "../../../entities/careFlow";
import { NodeConsult } from "../../../utils/createNode";
import { SearchResultType } from "../managers/searchQueue";

export type SearchCalled = {
    status: SearchResultType;
    message?: Result;
    called?: CallsConsult;
}

export enum Result {
    PatientRemoved = 'patient_removed',
    PatientCalled = 'patient_called'
}

class Calleds {
    private calleds: CallsConsult[];

    constructor() {
        this.calleds = [];
    }

    public insert(node: NodeConsult): CallsConsult {
        const called: CallsConsult = {
            careFlow_id: node.triage.careFlow_id,
            patient_name: node.patient_name,
            calls: 1
        };
        this.calleds.push(called);
        return called;
    };

    public searchCalled(id: number) {
        let result: SearchCalled;

        if (this.calleds.length === 0) {
            result = { status: SearchResultType.EmptyQueue };
            return result;
        }

        let temp: SearchCalled;
        for (let i of this.calleds) {
            if (i.careFlow_id === id) {
                temp = { status: SearchResultType.Found, called: i };
                break
            } else {
                temp = { status: SearchResultType.NotFound }
            }
        }

        result = temp!
        if (result.status !== SearchResultType.NotFound) {
            result.called!.calls++;

            if (result.called!.calls > 3) {
                const index: number = this.calleds.indexOf(result.called!);
                this.calleds.splice(index, 1);
                result.message = Result.PatientRemoved
                return result
            } else {
                result.message = Result.PatientCalled
                return result
            }
        }
        return result;
    };
}

export const calledsList: Calleds = new Calleds();