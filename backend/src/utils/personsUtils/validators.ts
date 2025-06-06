import { CareFlow } from "../../entities/careFlow";
import { Doctor, Employee, Nurse } from "../../entities/hospitalStaff";
import { openDb } from "../../db";

export class ValidateRegister {
	static async verifyPatient(patient: CareFlow['patient']): Promise<boolean> {
		const db = await openDb();

		try {
			const row = await db.get(
				'SELECT * FROM Patient WHERE name = ? AND cpf = ? AND rg = ?',
				[patient.name, patient.cpf, patient.rg]
			);

			if (row) {
				console.log('Paciente já cadastrado');
				return false;
			}

			return true;
		} catch (error) {
			console.log('Erro na verificação de paciente:', error);
			return false;
		}
	};

	static async verifyEmployee(user: Employee | Doctor | Nurse): Promise<boolean> {
		const db = await openDb();

		try {
			const row = await db.get(
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