import bcrypt from 'bcryptjs';
import { Employee, Nurse, Doctor } from '../../entities/hospitalStaff';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../../db';
import { RowDataPacket } from 'mysql2';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRATION = '72h';

export class Hash {
    static async hash(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, 10);
        return hashed
    };

    static async compare(id: number, password: string): Promise<boolean> {
        const [passworddb]: any = await db.execute<RowDataPacket[]>('SELECT * FROM User WHERE id = ?', [id]);
        const valid = await bcrypt.compare(password, passworddb[0].password);
        return valid;
    };
};

export class Jwt {
    static generateRegisterToken<T extends Employee | Nurse | Doctor>(payload: T): string {
        const token: string = jwt.sign(payload, JWT_SECRET!, {expiresIn: EXPIRATION});
        return token;
    };

    static verifyRegisterToken<T extends Employee | Nurse | Doctor>(data: string) {
        try {
            const token = jwt.verify(data, process.env.JWT_SECRET!) as T;
            return token
        } catch (error) {
            console.error(error);
        }
    };

    static generateLoginToken(id: number) {
        const token: string = jwt.sign({ id: id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
        return token
    };

    static verifyLoginToken(data: string) {
        try {
            const token = jwt.verify(data, process.env.JWT_SECRET!) as JwtPayload;
            return token;
            
        } catch (error) {
            console.error(error);
        }
    }
};
