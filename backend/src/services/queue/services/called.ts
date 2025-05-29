import { CallsConsult } from "../../../entities/careFlow";
import { openDb } from "../../../db";
import { NodeConsult } from "../../../utils/queueUtils/createNode";
import { QueueReturns } from "../../../utils/queueUtils/queueEnuns";
import { Status } from "../../../utils/personsUtils/generalEnuns"

export type SearchCalled = {
    status: QueueReturns;
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

    public async searchCalled(id: number) {
        let result: SearchCalled;

        if (this.calleds.length === 0) {
            result = { status: QueueReturns.EmptyQueue };
            return result;
        }

        let temp: SearchCalled;
        for (let i of this.calleds) {
            if (i.careFlow_id === id) {
                temp = { status: QueueReturns.Found, called: i };
                break
            } else {
                temp = { status: QueueReturns.NotFound }
            }
        }

        result = temp!
        if (result.status !== QueueReturns.NotFound) {
            result.called!.calls++;

            if (result.called!.calls > 3) {
                const db = await openDb();
                await db.run('UPDATE CareFlow SET status = ? WHERE id = ?', [Status.NoShow, result.called!.careFlow_id]);

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