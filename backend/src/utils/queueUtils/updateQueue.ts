import cron from 'node-cron';
import { PriorityHandler } from '../../services/queue/managers/priorityHandler';

export function StartSchedule() {
    cron.schedule('* * * * *', () => {
        console.log('Atualizando Fila');
        const result: string = PriorityHandler.verify();
        console.log('Resultado:', result)
    })
}