import { QueryResult } from "pg";
import {pool} from "../connectPg"
import { IProfesores, IProfesoresRepository } from "../interfaces/profesorRepository";
import {generateTimestampBasedId } from "../middleware/createIds";

export class ProfesoresRepository implements IProfesoresRepository {
    async create(data: IProfesores): Promise<IProfesores> {
      try{

          const cod_p = generateTimestampBasedId()
          const sql = `INSERT INTO Profesores(cod_p, nom_p, dir_p, tel_p, profecion, fecha_nac) 
                            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
          const result = await pool.query<IProfesores>(sql, [
              cod_p,
              data.nom_p,
              data.dir_p,
              data.tel_p,
              data.profecion,
              data.fech_nac,
          ]);
          return result.rows[0];

      }catch(error){
          console.log("Error al crear Profesores: ",error);
          throw new Error("Ocurrio un error al crear el Profesores.");
      }
    }
    async findById(dataId?: number): Promise<IProfesores> {
      try{
            const sql = `SELECT * FROM Profesores WHERE cod_p = $1`;
            const result = await pool.query<IProfesores>(sql, [dataId]);
            return result.rows[0];

      }catch(error){
        console.log("Error al obtener Profesores: ",error);    
        throw new Error("Ocurrio un error al obtener el Profesores.");

      }
    }
    async find(): Promise<IProfesores[]> {
        try {
            const sql = `SELECT * FROM Profesores`;
            const result = await pool.query<IProfesores>(sql);
            return result.rows;

        } catch (error) {
            console.log("Error al obtener Profesores: ",error);
            throw new Error("Ocurrio un error al obtener el Profesores.");
        }
    }
    async update(dataId: number, updateData: Partial<IProfesores>): Promise<IProfesores | null> {
      try{ 
        const fields = Object.keys(updateData);
        const setClauses = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
        const values = Object.values(updateData);
        const sql = `
           UPDATE Profesores
             SET ${setClauses}
           WHERE cod_p = $1 RETURNING *
        `;
        const result = await pool.query<IProfesores>(sql, [dataId, ...values]);
        return result.rows[0];

      }catch(error){
        console.log("Error al actualizar el Profesores",error)
        throw new Error("Ocurrio un error al actualizar el Profesores.");
      }
    }
    async delete(dataId: number): Promise<boolean | null> {
      try{  
        const sql = `DELETE FROM Profesores WHERE cod_p = $1`;
        const result: QueryResult = await pool.query(sql, [dataId]);
        if(result && result.rowCount !== null){
            return result.rowCount > 0;
        }
        return false

      }catch(error){
        console.log("Error al eliminar el Profesores",error)
        throw new Error("Ocurrio un error al eliminar el Profesores.");
      }
    }
}
