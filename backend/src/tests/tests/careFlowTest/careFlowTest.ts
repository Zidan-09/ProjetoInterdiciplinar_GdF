import { HospitalControllerTest } from "../../ControllersForTest/hospitalControllerTest";
import { QueueControllerTest } from "../../ControllersForTest/queueControllerTest";
import { patientRegister, consultInitData, consultEndData } from "../../parsesJson";
import { TypeQueue } from "../../../utils/queueUtils/queueEnuns";
import { waitTime } from "../../ControllersForTest/utilTest";
import { TriageTest } from "./triageTest";
import { ConsultTest } from "./consultTest";
import { AdminControllerTest } from "../../ControllersForTest/hospitalStaffControllerTest";

export async function CareFlowTest() {
    console.log('\n###################################################################################\nIniciando fluxo de atendimento...\n###################################################################################\n')
    await waitTime(3000);

    console.log('Gerando senhas...');
    await waitTime(3000)
    
    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 2});
    
    console.log('Senhas geradas com sucesso!\n')
    await waitTime(2000);
    console.log('Fila da recepção:\n')

    await QueueControllerTest.queue({typeQueue: TypeQueue.Recep});
    await waitTime(3000)

    console.log('Chamando próximo da fila da recepção...')
    await QueueControllerTest.callNext({typeQueue: TypeQueue.Recep});
    console.log('Senha chamada com sucesso!\n')
    await waitTime(2000);

    console.log('Cadastrando Paciente!')
    await HospitalControllerTest.register(patientRegister);
    console.log('Paciente cadastrado com sucesso!\n')
    await waitTime(2000)
    console.log('Exibindo pacientes cadastrados no banco de dados...')
    await waitTime(2000)

    await AdminControllerTest.listPatients();
    console.log('Pacientes cadastrados exibidos com sucesso!\n');
    await waitTime(3000)

    await TriageTest();
    await waitTime(2000);
    await ConsultTest();

    console.log('###################################################################################\nExecução completa!\n###################################################################################');
}