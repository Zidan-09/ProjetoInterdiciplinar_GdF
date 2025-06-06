import { HospitalControllerTest } from "../../ControllersForTest/hospitalControllerTest";
import { QueueControllerTest } from "../../ControllersForTest/queueControllerTest";
import { consultInitData, consultEndData } from "../../parsesJson";
import { TypeQueue } from "../../../utils/queueUtils/queueEnuns";
import { waitTime } from "../../ControllersForTest/utilTest";

export async function ConsultTest() {
    console.log('Fila para a consulta:\n')
    await QueueControllerTest.queue({typeQueue: TypeQueue.Consult});
    await waitTime(3000)

    console.log('Chamando o próximo da fila da consulta...')
    await QueueControllerTest.callNext({typeQueue: TypeQueue.Consult});
    console.log('Paciente chamado com sucesso!\n')
    await waitTime(2000)

    console.log('Iniciando consulta do paciente...')
    await HospitalControllerTest.confirmConsult(consultInitData);
    console.log('Consulta iniciada com sucesso!\n')
    await waitTime(10000);

    console.log('Finalizando consulta do paciente...')
    await HospitalControllerTest.consultEnd(consultEndData);
    console.log('Consulta finalizada com sucesso!\n')
    await waitTime(3000)
}