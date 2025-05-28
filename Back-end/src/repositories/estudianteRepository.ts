import { QueryResult } from "pg";
import {pool} from "../connectPg"
import { IEstudiante, IEstudianteRepository } from "../interfaces/estudianteRepository";
import {generateTimestampBasedId } from "../middleware/createIds";

export class EstudianteRepository implements IEstudianteRepository {
    async create(data: IEstudiante): Promise<IEstudiante> {
      try{

          const cod_e = generateTimestampBasedId()
          const sql = `INSERT INTO Estudiantes(cod_e, nom_e, dir_e, tel_e, fech_nac) 
                            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
          const result = await pool.query<IEstudiante>(sql, [
              cod_e,
              data.nom_e,
              data.dir_e,
              data.tel_e,
              data.fech_nac,
          ]);
          return result.rows[0];

      }catch(error){
          console.log("Error al crear estudiante: ",error);
          throw new Error("Ocurrio un error al crear el estudiante.");
      }
    }
    async findById(dataId?: number): Promise<IEstudiante> {
      try{
            const sql = `SELECT * FROM Estudiantes WHERE cod_e = $1`;
            const result = await pool.query<IEstudiante>(sql, [dataId]);
            return result.rows[0];

      }catch(error){
        console.log("Error al obtener estudiantes: ",error);    
        throw new Error("Ocurrio un error al obtener el estudiantes.");

      }
    }
    async find(): Promise<IEstudiante[]> {
        try {
            const sql = `SELECT * FROM Estudiantes`;
            const result = await pool.query<IEstudiante>(sql);
            return result.rows;

        } catch (error) {
            console.log("Error al obtener estudiantes: ",error);
            throw new Error("Ocurrio un error al obtener el estudiantes.");
        }
    }
    async update(dataId: number, updateData: Partial<IEstudiante>): Promise<IEstudiante | null> {
      try{ 
        const fields = Object.keys(updateData);
        const setClauses = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
        const values = Object.values(updateData);
        const sql = `
           UPDATE Estudiantes
             SET ${setClauses}
           WHERE cod_e = $1 RETURNING *
        `;
        const result = await pool.query<IEstudiante>(sql, [dataId, ...values]);
        return result.rows[0];

      }catch(error){
        console.log("Error al actualizar el estudiante",error)
        throw new Error("Ocurrio un error al actualizar el estudiante.");
      }
    }
    async delete(dataId: number): Promise<boolean | null> {
      try{  
        const sql = `DELETE FROM Estudiantes WHERE cod_e = $1`;
        const result: QueryResult = await pool.query(sql, [dataId]);
        if(result && result.rowCount !== null){
            return result.rowCount > 0;
        }
        return false

      }catch(error){
        console.log("Error al eliminar el estudiante",error)
        throw new Error("Ocurrio un error al eliminar el estudiante.");
      }
    }
}
