import { db } from "../../db";
import { TriageCategory } from "../../entities/triageCategory";
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { AdminResponses } from "../../utils/enuns/allResponses";

export const TriageCategoryManager = {
    async createCategory(newTriageCategory: TriageCategory): Promise<RowDataPacket|undefined> {
        try {
            const [result] = await db.execute<ResultSetHeader>('INSERT INTO TriageCategory (name, color, limitMinutes, priority) VALUES (?, ?, ?, ?)', [newTriageCategory.name, newTriageCategory.color, newTriageCategory.limitMinutes, newTriageCategory.priority]);
            const [triageCategory] = await db.execute<RowDataPacket[]>('SELECT * FROM TriageCategory WHERE id = ?', [result.insertId])
            return triageCategory[0];

        } catch (error) {
            console.error(error);
        }
    },

    async updateCategory(name: TriageCategory['name'], newLimitMinutes: number): Promise<RowDataPacket|undefined> {
        try {
            await db.execute<ResultSetHeader>('UPDATE TriageCategory SET limitMinutes = ? WHERE name = ?', [newLimitMinutes, name]);
            const [result] = await db.execute<RowDataPacket[]>('SELECT * FROM TriageCategory WHERE name = ?', [name]);
            return result[0];

        } catch (error) {
            console.error(error)
        }
    },

    async listCategories(): Promise<RowDataPacket[]|undefined> {
        try {
            const [categories] = await db.execute<RowDataPacket[]>('SELECT * FROM TriageCategory');
            return categories;

        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async findByName(name: string): Promise<RowDataPacket|undefined> {
        try {
            const [triageCategory] = await db.execute<RowDataPacket[]>('SELECT * FROM TriageCategory WHERE name = ?', [name]);
            return triageCategory[0];
            
        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    async delete(name: string): Promise<AdminResponses|undefined> {
        try {
            await db.execute('DELETE FROM TriageCategory WHERE name = ?', [name]);
            return AdminResponses.DeletedCategory
            
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}