import { QueryResult } from "pg";
import {pool} from "../connectPg"
import { IAsignatura, IAsignaturaRepository } from "../interfaces/asignaturaRepository";
import {generateTimestampBasedId } from "../middleware/createIds";

export class AsignaturaRepository implements IAsignaturaRepository {
    async create(data: IAsignatura): Promise<IAsignatura> {
      try{

          const sql = `INSERT INTO Asignaturas(nom_a, int_h, creditos) 
                            VALUES ($1, $2, $3) RETURNING *`;
          const result = await pool.query<IAsignatura>(sql, [
              data.nom_a,
              data.int_h,
              data.creditos
          ]);
          return result.rows[0];

      }catch(error){
          console.log("Error al crear Asignaturas: ",error);
          throw new Error("Ocurrio un error al crear el Asignaturas.");
      }
    }
    async findById(dataId?: number): Promise<IAsignatura> {
      try{
            const sql = `SELECT * FROM Asignaturas WHERE cod_a = $1`;
            const result = await pool.query<IAsignatura>(sql, [dataId]);
            return result.rows[0];

      }catch(error){
        console.log("Error al obtener Asignaturas: ",error);    
        throw new Error("Ocurrio un error al obtener el Asignaturas.");

      }
    }
    async find(): Promise<IAsignatura[]> {
        try {
            const sql = `SELECT * FROM Asignaturas`;
            const result = await pool.query<IAsignatura>(sql);
            return result.rows;

        } catch (error) {
            console.log("Error al obtener Asignaturas: ",error);
            throw new Error("Ocurrio un error al obtener el Asignaturas.");
        }
    }
    async update(dataId: number, updateData: Partial<IAsignatura>): Promise<IAsignatura | null> {
      try{ 
        const fields = Object.keys(updateData);
        const setClauses = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
        const values = Object.values(updateData);
        const sql = `
           UPDATE Asignaturas
             SET ${setClauses}
           WHERE cod_a = $1 RETURNING *
        `;
        const result = await pool.query<IAsignatura>(sql, [dataId, ...values]);
        return result.rows[0];

      }catch(error){
        console.log("Error al actualizar el Asignaturas",error)
        throw new Error("Ocurrio un error al actualizar el Asignaturas.");
      }
    }
    async delete(dataId: number): Promise<boolean | null> {
      try{  
        const sql = `DELETE FROM Asignaturas WHERE cod_a = $1`;
        const result: QueryResult = await pool.query(sql, [dataId]);
        if(result && result.rowCount !== null){
            return result.rowCount > 0;
        }
        return false

      }catch(error){
        console.log("Error al eliminar el Asignaturas",error)
        throw new Error("Ocurrio un error al eliminar el Asignaturas.");
      }
    }
}
