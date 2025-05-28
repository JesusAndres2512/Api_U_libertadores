import { pool } from "../connectPg";
import { IInscribe, IInscribeRepository } from "../interfaces/inscribeRepository";

export class InscribeRepository implements IInscribeRepository{

 async create(data: IInscribe): Promise<IInscribe> {
    try{

        const sql = `INSERT INTO Inscribe(cod_e, cod_a, cod_p, grupo, n1, n2, n3) 
                          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const result = await pool.query<IInscribe>(sql, [
            data.cod_e,
            data.cod_a,
            data.cod_p,
            data.grupo,
            data.n1,
            data.n2,
            data.n3
        ]);
        return result.rows[0];

    }catch(error){
        console.log("Error al crear la inscripcion de la materia: ",error);
        throw new Error("Ocurrio un error al crear la materia.");
    }
  }
 async findById(dataId?: number): Promise<IInscribe | null> {
     try{
        const sql = `SELECT 
		                  a.cod_a,
		                  a.nom_a,
		                  i.grupo,
		                  e.cod_e,
		                  e.nom_e,
		                  i.n1,
		                  i.n2,
		                  i.n3
                     FROM Inscribe i
                         JOIN Estudiantes e ON i.cod_e = e.cod_e
                         JOIN Asignaturas a ON i.cod_a = a.cod_a
                     WHERE cod_e = $1`;
        const result = await pool.query<IInscribe>(sql, [dataId]);
        return result.rows[0];

     }catch(error){
        console.log("Error al obtener la inscripcion de la materia: ",error);
        throw new Error("Ocurrio un error al crear la materia.");
     }
 }

 async find(): Promise<IInscribe[]> {
    try{
        const sql = `SELECT 
		                  a.cod_a,
		                  a.nom_a,
		                  i.grupo,
		                  e.cod_e,
		                  e.nom_e,
		                  i.n1,
		                  i.n2,
		                  i.n3
                     FROM Inscribe i
                         JOIN Estudiantes e ON i.cod_e = e.cod_e
                         JOIN Asignaturas a ON i.cod_a = a.cod_a`;
        const result = await pool.query<IInscribe>(sql);
        return result.rows;

     }catch(error){
        console.log("Error al obtener la inscripcion de la materia: ",error);
        throw new Error("Ocurrio un error al crear la materia.");
     }
 }

 async update(dataId: number, updateData: Partial<IInscribe>): Promise<IInscribe | null> {
   try{ 
    const fields = Object.keys(updateData);
    const setClauses = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
    const values = Object.values(updateData);
    const sql = `
       UPDATE Inscribe
         SET ${setClauses}
       WHERE cod_e = $1 RETURNING *
    `;
    const result = await pool.query<IInscribe>(sql, [dataId, ...values]);
    return result.rows[0];

  }catch(error){
    console.log("Error al actualizar el estudiante",error)
    throw new Error("Ocurrio un error al actualizar el estudiante.");
  }

 }
async delete(dataId: number): Promise<boolean | null> {
    return false;
}

}
