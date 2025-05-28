import { Repository } from "./repositoryTypes";

export interface IInscribe{
    cod_e: number;
    cod_a: number;
    cod_p: number;
    grupo: number;
    n1: number;
    n2: number;
    n3: number;
  }

export interface IInscribeRepository extends Repository<IInscribe>{}

export interface IInscribeService {
  createInscripcion(inscribir:IInscribe): Promise<IInscribe | null>
  findAsignaturaById(estudianteId: number): Promise<IInscribe | null>
  findAsignatura(): Promise<IInscribe[]>
  updateAsignatura(estudianteId: number, updateData: Partial<IInscribe>):Promise<IInscribe | null>

}
