import { User } from "../../entities/hospitalStaff";
import { openDb } from "../../db";
import bcrypt from 'bcryptjs';
import { Jwt } from "../../utils/systemUtils/security";


export class Login {
    static async loginUser(data: User) {
        const db = await openDb();
        try {
            const userData: any = await db.get('SELECT * FROM User WHERE username = ?', [data.username]);

            if (userData) {
                const valid: boolean = await bcrypt.compare(data.password, userData.password);

                if (valid) {
                    const token = Jwt.generateLoginToken(userData.user_id);

                    return {
                        user: userData.username,
                        token: token
                    }
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
}