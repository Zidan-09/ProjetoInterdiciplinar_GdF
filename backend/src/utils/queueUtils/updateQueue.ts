import cron from 'node-cron';
import { PriorityHandler } from '../../services/queue/managers/priorityHandler';

export function StartSchedule() {
    cron.schedule('* * * * *', () => {
        const result = PriorityHandler.verify();

        if (result) {
            console.log('Resultado:', result);
        }
    })
}