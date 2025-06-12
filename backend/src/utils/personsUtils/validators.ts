import { CareFlow } from "../../entities/careFlow";
import { Doctor, Employee, Nurse } from "../../entities/hospitalStaff";
import { db } from "../../db";

export class ValidateRegister {
	static async verifyPatient(patient: CareFlow['patient']): Promise<boolean> {
		try {
			const row = await db.execute(
				'SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?',
				[patient.name, patient.cpf, patient.rg]
			);

			if (row) {
				return false;
			}

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	static async verifyEmployee(user: Employee | Doctor | Nurse): Promise<boolean> {
		try {
			const row = await db.execute(
				'SELECT * FROM Employee WHERE name = ? AND cpf = ?',
				[user.name, user.cpf]
			);
			
			if (row) {
				return false;
			} else {
				return true;
			}
		} catch (error) {
			console.log('Erro na busca', error);
			return false;
		}
	}
}