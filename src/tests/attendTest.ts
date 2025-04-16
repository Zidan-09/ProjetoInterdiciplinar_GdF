import { AttendQ } from "../models/queue";
import { QueueServices } from "../services/queueService";

QueueServices.insertAttendQueue('NonPriority');
QueueServices.callNextAttend()