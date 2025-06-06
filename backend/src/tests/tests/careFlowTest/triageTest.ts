import { TypeQueue } from "../../../utils/queueUtils/queueEnuns";
import { QueueControllerTest } from "../../ControllersForTest/queueControllerTest";
import { waitTime } from "../../ControllersForTest/utilTest";
import { HospitalControllerTest } from "../../ControllersForTest/hospitalControllerTest";
import { triageInitData, triageEndData } from "../../parsesJson";

export async function TriageTest() {
    console.log('Fila para a triagem:\n')
    await QueueControllerTest.queue({typeQueue: TypeQueue.Triage});
    await waitTime(3000)

    console.log('\nChamando o próximo da fila da triagem...');
    await QueueControllerTest.callNext({typeQueue: TypeQueue.Triage});
    console.log('Paciente chamado com sucesso!\n')
    await waitTime(3000)

    console.log('Iniciando triagem de paciente...')
    await HospitalControllerTest.startTriage(triageInitData);
    console.log('Triagem iniciada com sucesso!\n');
    await waitTime(5000)
    console.log('Finalizando triagem de paciente...')
    await HospitalControllerTest.endTriage(triageEndData);
    console.log('Triagem finalizada com sucesso!\n')
}