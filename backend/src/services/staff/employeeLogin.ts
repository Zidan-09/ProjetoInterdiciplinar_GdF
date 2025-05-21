import { User } from "../../models/hospitalStaff";
import { openDb } from "../../db";
import bcrypt from 'bcryptjs';

const db = openDb();

export class Login {
    static async loginUser(data: User) {
        try {
            const userData: any = (await db).get('SELECT * FROM User WHERE email = ?', [data.email]);

            if (userData) {
                const valid: boolean = await bcrypt.compare(data.password, userData.password);
            }

        } catch (error) {
            console.error(error);
        }
    }
}