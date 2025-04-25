import { QueueServices } from "../services/queueService";

QueueServices.createTicket(1);
QueueServices.createTicket(1);
QueueServices.createTicket(1);
QueueServices.createTicket(3);
QueueServices.createTicket(2);

QueueServices.showQueue('attend');