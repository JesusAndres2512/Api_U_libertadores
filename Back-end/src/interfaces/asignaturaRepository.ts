import { Repository } from "./repositoryTypes";

export interface IAsignatura{
    cod_a: number;
    nom_a: string;
    int_h: number;
    creditos: number;
  }

export interface IAsignaturaRepository extends Repository<IAsignatura>{}

export interface IAsignaturaService {
  createAsignatura(asignatura:IAsignatura): Promise<IAsignatura | null>
  findAsignatura(): Promise<IAsignatura[]>
  findAsignaturaById(asignaturaId: number): Promise<IAsignatura | null>
  updateAsignatura(asignaturaId: number, updateData: Partial<IAsignatura>):Promise<IAsignatura | null>
  deleteAsignatura(asignaturaId: number):Promise<boolean | null>
}
