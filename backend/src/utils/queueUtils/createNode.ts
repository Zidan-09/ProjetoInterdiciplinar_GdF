import { EndTriage } from "../../entities/careFlow";
import { TriageCategoryManager } from "../../services/adm/triageCategoryManager";
import { PatientManager } from "../../services/hospital/patientManager";
import { findById } from "../systemUtils/searchCareFlow";

class NodeRecep {
    ticket: string | null;
    priority: number;
    pointer: null | NodeRecep;

    constructor(priority: number) {
        this.ticket = null;
        this.priority = priority;
        this.pointer = null;
    }
};

class NodeTriage {
    careFlow_id: number;
    patient_id: number;
    patient_name: string;
    pointer: null | NodeTriage;

    constructor(careFlow_id: number, patient_id: number, patient_name: string) {
        this.careFlow_id = careFlow_id;
        this.patient_id = patient_id;
        this.patient_name = patient_name;
        this.pointer = null;
    }

    static async create(careFlow_Id: number, patient_id: number): Promise<NodeTriage> {
        const patient = await PatientManager.findById(patient_id);

        return new NodeTriage(careFlow_Id, patient_id, patient!.name);
    }
};

class NodeConsult {
    careFlow_id: number;
    triage: EndTriage;
    patient_name: string;
    triageCategory: number;
    time: Date;
    limitDate: Date;
    maxPriority: boolean;
    pointer: null | NodeConsult;

    constructor(careFlow_id: number, patientTriage: EndTriage, patient_name: string, triageCategory: number, limitDate: number) {
        this.careFlow_id = careFlow_id;
        this.triage = patientTriage;
        this.patient_name = patient_name;
        this.triageCategory = triageCategory;
        this.time = new Date();
        this.limitDate = new Date(Date.now() + limitDate * 60000);
        this.maxPriority = false;
        this.pointer = null;
    }

    static async create(careFlow_id: number, patientTriage: EndTriage) {
        const triageCategory = await TriageCategoryManager.findByName(patientTriage.triageCategory);

        if (!triageCategory) {
            return undefined

        } else {
            const careFlow = await findById(careFlow_id);

            if (!careFlow) {
                return undefined

            } else {
                const patient = await PatientManager.findById(careFlow.patient_id);
                return new NodeConsult(careFlow_id, patientTriage, patient!.name, triageCategory.priority, triageCategory.limitMinutes);
            }
        }

    }
};

export { NodeConsult, NodeTriage, NodeRecep }