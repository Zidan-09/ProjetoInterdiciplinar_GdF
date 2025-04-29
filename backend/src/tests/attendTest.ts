import { QueueServices } from "../services/queueService";
import { Convert } from "../utils/convertJson";
import { ValidateRegister } from "../utils/validateRegister";
import { recepcionist } from "./test";

console.log('GERAÇÃO DE SENHAS:');
console.log('/'.repeat(20));

QueueServices.createTicket(1);
QueueServices.createTicket(1);

QueueServices.showQueue('attend');

console.log('CHAMADAS/CADASTROS:')
console.log('/'.repeat(20));

QueueServices.callNextAttend();
// ValidateRegister.verify();