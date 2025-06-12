// src/testConnection.ts
import { db } from './db';

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Conexão bem-sucedida! Resultado:', rows);
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  } finally {
    await db.end(); // fecha o pool após o teste
  }
})();
