import { Attend } from "../models/attend";
import { Consult } from "../models/consult";
import { Doctor, Nurse, Recepcionist } from "../models/hospitalStaff";
import { Patient } from "../models/patient";
import { Triage } from "../models/triage";

export class DataBase {
    name: string = 'GdF_DB';
    patients: Patient[] = [];
    recepcionists: Recepcionist[] = [];
    nurses: Nurse[] = [];
    doctors: Doctor[] = [];
    attends: Attend[] = [];
    triages: Triage[] = [];
    consults: Consult[] = [];

    static searchById(id: number) {
        
    }
}