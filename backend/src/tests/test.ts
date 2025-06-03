import { EmployersConstrollerTest } from "./ControllersForTest/hospitalStaffControllerTest";
import { HospitalControllerTest } from "./ControllersForTest/hospitalControllerTest";
import { QueueControllerTest } from "./ControllersForTest/queueControllerTest";
import { chichi, bulma, goku, whis, chichiActivate, bulmaActivate, gokuActivate, whisActivate, patientRegister, triageData, consultInitData, consultEndData } from "./parsesJson";
import { initDb } from "../db";
import { TypeQueue } from "../utils/queueUtils/queueEnuns";

function esperar(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function start() {
    await initDb();

    console.log('###################################################################################\nCadastrando empregados...\n###################################################################################\n')
    await esperar(3000);

    console.log('Cadastrando Recepcionista...');
    await EmployersConstrollerTest.register(chichi);
    console.log('Cadastro concluído!\n');
    await esperar(5000);
    
    console.log('Cadastrando Enfermeira...');
    await EmployersConstrollerTest.register(bulma);
    console.log('Cadastro concluído!\n');
    await esperar(5000);
    
    console.log('Cadastrando Médico...');
    await EmployersConstrollerTest.register(goku);
    console.log('Cadastro concluído!\n');
    await esperar(5000);
    
    console.log('Cadastrando Administrador...');
    await EmployersConstrollerTest.register(whis);
    console.log('Cadastro concluído!\n');
    await esperar(5000);
    
    console.log('###################################################################################\nAutenticando empregados...\n###################################################################################\n')
    await esperar(3000);
    
    await EmployersConstrollerTest.authAccount(chichiActivate);
    await esperar(2000)
    await EmployersConstrollerTest.authAccount(bulmaActivate);
    await esperar(2000)
    await EmployersConstrollerTest.authAccount(gokuActivate);
    await esperar(2000)
    await EmployersConstrollerTest.authAccount(whisActivate);
    await esperar(2000)
    console.log('Empregados autenticados!\n')
    await esperar(5000);
    
    console.log('###################################################################################\nGerando senhas...\n###################################################################################\n')
    await esperar(3000)
    
    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 1});
    await HospitalControllerTest.createTicket({priority: 2});
    
    console.log('Senhas geradas com sucesso!\n')
    await esperar(2000);
    console.log('Fila da recepção:\n')

    await QueueControllerTest.queue({typeQueue: TypeQueue.Recep});
    await esperar(3000)
    console.log('\n###################################################################################\nIniciando fluxo de atendimento...\n###################################################################################\n')
    await esperar(3000);

    console.log('Chamando próximo da fila da recepção...')
    await QueueControllerTest.callNext({typeQueue: TypeQueue.Recep});
    console.log('Senha chamada com sucesso!\n')
    await esperar(2000);

    console.log('Cadastrando Paciente!')
    await HospitalControllerTest.register(patientRegister);
    console.log('Paciente cadastrado com sucesso!\n')
    await esperar(2000)
    console.log('Exibindo pacientes cadastrados no banco de dados...')
    await esperar(2000)

    await HospitalControllerTest.list();
    console.log('Pacientes cadastrados exibidos com sucesso!\n');
    await esperar(3000)

    console.log('Fila para a triagem:\n')
    await QueueControllerTest.queue({typeQueue: TypeQueue.Triage});
    await esperar(3000)

    console.log('\nChamando o próximo da fila da triagem...');
    await QueueControllerTest.callNext({typeQueue: TypeQueue.Triage});
    console.log('Paciente chamado com sucesso!\n')
    await esperar(3000)

    console.log('Iniciando triagem de paciente...')
    await HospitalControllerTest.triage(triageData);
    console.log('Triagem realizada com sucesso!\n')
    await esperar(2000)

    console.log('Fila para a consulta:\n')
    await QueueControllerTest.queue({typeQueue: TypeQueue.Consult});
    await esperar(3000)

    console.log('Chamando o próximo da fila da consulta...')
    await QueueControllerTest.callNext({typeQueue: TypeQueue.Consult});
    console.log('Paciente chamado com sucesso!\n')
    await esperar(2000)

    console.log('Iniciando consulta do paciente...')
    await HospitalControllerTest.confirmConsult(consultInitData);
    console.log('Consulta iniciada com sucesso!\n')
    await esperar(10000);

    console.log('Finalizando consulta do paciente...')
    await HospitalControllerTest.consultEnd(consultEndData);
    console.log('Consulta finalizada com sucesso!\n')
    await esperar(3000)

    console.log('###################################################################################\nExecução completa!\n###################################################################################');
}

start();