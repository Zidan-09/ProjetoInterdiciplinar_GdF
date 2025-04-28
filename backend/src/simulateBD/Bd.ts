import { Attend } from "../models/attend";
import { Consult } from "../models/consult";
import { Doctor, Nurse, Recepcionist } from "../models/hospitalStaff";
import { Patient } from "../models/patient";
import { Triage } from "../models/triage";

export class DataBase {
    name: string = 'GdF_DB';
    patients: Patient[];
    recepcionists: Recepcionist[];
    nurses: Nurse[];
    doctors: Doctor[];
    attends: Attend[];
    triages: Triage[];
    consults: Consult[];

    constructor () {
        this.patients = [];
        this.recepcionists = [];
        this.nurses = [];
        this.doctors = [];
        this.attends = [];
        this.triages = [];
        this.consults = [];
    }

    static searchById(id: number): Patient | undefined {
        for (let i of DB.patients) {
            if (i.id == id) {
                return i;
            }
        }
    }

    static searchNurse(id: number): Nurse | undefined {
        for (let i of DB.nurses) {
            if (i.id == id) {
                return i;
            }
        }
    }

    static searchRecepcionist(id: number): Recepcionist | undefined {
        for (let i of DB.recepcionists) {
            if (i.id == id) {
                return i;
            }
        }
    }

    static searchAttend(id: number): string | undefined {
        for (let i of DB.attends) {
            if (i.id == id) {
                return i.ticket;
            }
        }
    }
}

export const DB: DataBase = new DataBase();