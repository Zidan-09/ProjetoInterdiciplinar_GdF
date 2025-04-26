import { QueueServices } from "../services/queueService";
import { PatientRegistration } from "../services/patientServices";
import { Convert } from "../utils/convertJson";
import patient1 from "../Json/patient1.json";

console.log('GERAÇÃO DE SENHAS:');
console.log('/'.repeat(20));

QueueServices.createTicket(1);
QueueServices.createTicket(1);

QueueServices.showQueue('attend');

console.log('CHAMADAS/CADASTROS:')
console.log('/'.repeat(20));

QueueServices.callNextAttend();
PatientRegistration.register(Convert.JsonToData(patient1));