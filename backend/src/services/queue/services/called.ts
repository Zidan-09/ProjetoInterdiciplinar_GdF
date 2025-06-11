import { NodeConsult } from "../../../utils/queueUtils/createNode";
import { getSocketInstance } from "../../../socket";
import { TypeQueue } from "../../../utils/queueUtils/queueEnuns";
import { wait } from "../../../utils/systemUtils/wait";

export async function calls(node: NodeConsult) {
    const io = getSocketInstance();
    const call = {
        node: node,
        calledTimes: 1
    }
    await wait(10000)

    while (call.calledTimes <= 3) {
        io.emit(TypeQueue.Consult, {
            called: call.node.patient_name,
            queue: TypeQueue.Consult
        })
        await wait(10000);
        call.calledTimes++;
    }
}