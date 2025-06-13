import { Response, Request } from "express";
import { HandleResponse, ErrorResponse } from "../utils/systemUtils/handleResponse";
import { Periods } from "../utils/enuns/periods";
import { CareFlowReports } from "../services/adm/reports/careFlowReports";
import { QueueReports } from "../services/adm/reports/queueReports";
import { PatientManager } from "../services/hospital/patientManager";
import { TriageCategoryManager } from "../services/adm/triageCategoryManager";
import { Patient } from "../entities/patient";
import { TriageCategory, UpdateTriageCategory } from "../entities/triageCategory";
import { AdminResponses, ServerResponses } from "../utils/enuns/allResponses";
import { Recover } from "../services/adm/recover";
import { PatientReports } from "../services/adm/reports/patientReports";

type AdminParams = { period: Periods }
type Category = { triageCategory: string }

export const AdminController = {
    async listCareFlows(req: Request, res: Response) {
        try {
            const careFlows = await CareFlowReports.showAllCareFlows();

            if (careFlows) {
                HandleResponse(true, 200, AdminResponses.ShowedCareFlows, careFlows, res);
            } else {
                HandleResponse(false, 400, AdminResponses.ShowCareFlowsFailed, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async queueReport(req: Request<AdminParams>, res: Response) {
        const period = req.params;

        try {
            const queueTimes = await QueueReports.getAverageQueueTimes(period.period);
            HandleResponse(true, 200, AdminResponses.ShowedQueueReport, queueTimes, res);

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async careFlowTimeReport(req: Request<AdminParams>, res: Response) {
        const period = req.params;

        try {
            const consultTime = await CareFlowReports.getAverageConsultTime(period.period);
            const triageTime = await CareFlowReports.getAverageTriageTime(period.period);
            const totalTime = await CareFlowReports.getAverageCareFlowTime(period.period);

            HandleResponse(true, 200, AdminResponses.ShowedCareFlowReport, { consultTime, triageTime, totalTime }, res);

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async listPatients(req: Request, res: Response) {
        try {
            const patients = await PatientManager.list();

            if (patients) {
                HandleResponse(true, 200, AdminResponses.ShowedPatients, patients, res);

            } else {
                HandleResponse(false, 400, AdminResponses.ShowPatientsFailed, null, res);
            }
    
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async leftBeforeConsult(req: Request<AdminParams>, res: Response) {
        const period = req.params;

        try {
            const result = await PatientReports.getLeftBeforeConsult(period.period);
            
            if (result) {
                HandleResponse(true, 200, AdminResponses.ShowedLeftBeforeConsult, result, res);

            } else {
                HandleResponse(false, 400, AdminResponses.ShowLeftBeforeConsultFailed, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async searchPatient(req: Request<{}, {}, Patient['cpf']>, res: Response) {
        const patientData: Patient['cpf'] = req.body;

        try {
            const patient = await PatientManager.findByCpf(patientData);

            if (patient) {
                HandleResponse(true, 200, AdminResponses.PatientFounded, patient, res);
            } else {
                HandleResponse(false, 404, AdminResponses.PatientNotFound, null, res);
            }
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async createTriageCategory(req: Request<{}, {}, TriageCategory>, res: Response) {
        const newTriageCategory: TriageCategory = req.body;

        try {
            const result = await TriageCategoryManager.createCategory(newTriageCategory);

            if (result) {
                HandleResponse(true, 201, AdminResponses.TriageCategoryCreated, newTriageCategory, res);

            } else {
                HandleResponse(false, 400, AdminResponses.TriageCategoryCreateFailed, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async updateTriageCategory(req: Request<{}, {}, UpdateTriageCategory>, res: Response) {
        const triageCategoryData: UpdateTriageCategory = req.body;

        try {
            const result = await TriageCategoryManager.updateCategory(triageCategoryData.name, triageCategoryData.limitMinutes);

            if (result) {
                HandleResponse(true, 200, AdminResponses.TriageCategoryUpdated, triageCategoryData, res);

            } else {
                HandleResponse(false, 400, AdminResponses.TriageCategoryUpdateFailed, null, res);
            }

        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async listTriageCategories(req: Request, res: Response) {
        try {
            const result = await TriageCategoryManager.listCategories();

            if (result) {
                HandleResponse(true, 200, AdminResponses.ShowedTriageCategories, result, res);
            } else {
                HandleResponse(false, 400, AdminResponses.TriageCateoriesFetchFailed, null, res);
            }
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async deleteTriageCategory(req: Request<Category>, res: Response) {
        const data = req.params;
        try {
            const result = await TriageCategoryManager.delete(data.triageCategory);

            if (result) {
                HandleResponse(true, 200, AdminResponses.DeletedCategory, result, res);
            } else {
                HandleResponse(false, 400, AdminResponses.DeleteCategoryFailed, null, res);
            }
        } catch (error) {
            ErrorResponse(error, res);
        }
    },

    async recover(req: Request, res: Response) {
        try {
            await Recover();
            HandleResponse(true, 200, ServerResponses.SystemRecovered, null, res);

        } catch (error) {
            ErrorResponse(error, res);
        }
    }
}