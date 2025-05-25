import bcrypt from 'bcryptjs';
import { Receptionist, Nurse, Doctor, Admin } from '../entities/hospitalStaff';
import jwt from 'jsonwebtoken';
import { openDb } from '../db';
require('dotenv').config();

const db = openDb();

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRATION = '72h';

export class Hash {
    static async hash(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, 10);
        return hashed
    };

    static async compare(id: number, password: string): Promise<boolean> {
        const passworddb: any = (await db).get('SELECT password FROM User WHERE id = ?', [id]);
        const valid = await bcrypt.compare(password, passworddb);
        return valid;
    };
};

export class Jwt {
    static generateToken<T extends Receptionist | Nurse | Doctor | Admin>(payload: T): string {
        const token: string = jwt.sign(payload, JWT_SECRET!, {expiresIn: EXPIRATION});
        return token;
    };

    static verifyToken<T extends Receptionist | Nurse | Doctor | Admin>(token: string) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET!) as T;
            return data
        } catch (error) {
            console.error(error);
            return null
        }
    }
};
