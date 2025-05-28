import { Repository } from "./repositoryTypes";

export interface IImparte{
    cod_p: number;
    cod_a: number;
    grupo: number;
    hora_inicio: string;
    hora_fin: string ;
  }

export interface IImparteRepository extends Repository<IImparte>{}

export interface IImparteService {
  createImparte(imparte:IImparte): Promise<IImparte | null>
  findImparteById(profesorId: number): Promise<IImparte | null>
  findImparte(): Promise<IImparte[]>
  updateImparte(profesorId: number, updateData: Partial<IImparte>):Promise<IImparte | null>
  deleteImparte(profesorId: number): Promise<boolean | null>
}
