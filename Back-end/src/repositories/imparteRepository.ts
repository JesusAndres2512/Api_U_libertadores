import { QueryResult } from "pg";
import { pool } from "../connectPg";
import { IImparte,IImparteRepository } from "../interfaces/imparteRepository";

export class ImparteRepository implements IImparteRepository{

 async create(data: IImparte): Promise<IImparte> {
    try{

        const sql = `INSERT INTO Imparte(cod_p, cod_a, grupo, hora_inicio, hora_fin) 
                          VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await pool.query<IImparte>(sql, [
            data.cod_p,
            data.cod_a,
            data.grupo,
            data.hora_inicio,
            data.hora_fin
        ]);
        return result.rows[0];

    }catch(error){
        console.log("Error al crear la inscripcion de la materias impartidas: ",error);
        throw new Error("Ocurrio un error al crear la materia.");
    }
  }
 async findById(dataId?: number): Promise<IImparte | null> {
     try{
        const sql = `SELECT 
		                  p.cod_p,
		                  p.nom_p,
                          a.cod_a,
                          a.nom_a,
		                  i.grupo,
		                  i.hora_inicio,
                          i.hora_fin
                     FROM Imparte i
                         JOIN Profesores p ON i.cod_e = p.cod_e
                         JOIN Asignaturas a ON i.cod_a = a.cod_a
                     WHERE cod_p = $1`;
        const result = await pool.query<IImparte>(sql, [dataId]);
        return result.rows[0];

     }catch(error){
        console.log("Error al obtener las materia: ",error);
        throw new Error("Ocurrio un error al crear la materia.");
     }
 }

 async find(): Promise<IImparte[]> {
    try{
        const sql = `SELECT 
		                  i.cod_p,
		                  p.nom_p,
                          a.cod_a,
                          a.nom_a,
		                  i.grupo,
		                  i.hora_inicio,
                          i.hora_fin
                     FROM Imparte i
                         JOIN Profesores p ON i.cod_e = p.cod_e
                         JOIN Asignaturas a ON i.cod_a = a.cod_a`;
        const result = await pool.query<IImparte>(sql);
        return result.rows;

     }catch(error){
        console.log("Error al obtener las materias: ",error);
        throw new Error("Ocurrio un error al crear la materia.");
     }
 }

 async update(dataId: number, updateData: Partial<IImparte>): Promise<IImparte | null> {
   try{ 
    const fields = Object.keys(updateData);
    const setClauses = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
    const values = Object.values(updateData);
    const sql = `
       UPDATE Imparte
         SET ${setClauses}
       WHERE cod_p = $1 RETURNING *
    `;
    const result = await pool.query<IImparte>(sql, [dataId, ...values]);
    return result.rows[0];

  }catch(error){
    console.log("Error al actualizar la materia",error)
    throw new Error("Ocurrio un error al actualizar el estudiante.");
  }

 }
async delete(dataId: number): Promise<boolean | null> {
    const sql = `DELETE FROM Imparte WHERE cod_p = $1`;
    const result: QueryResult = await pool.query(sql, [dataId]);
    if(result && result.rowCount !== null){
        return result.rowCount > 0;
    }
    return false
}

}
