import dotenv from "dotenv";
import { Pool } from "pg"; 

dotenv.config(); 


const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

(async () => {
    try {
        const client = await pool.connect(); 
        console.log("Conexión exitosa a la base de datos 🚀");
        client.release(); 
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
})();

export { pool };
