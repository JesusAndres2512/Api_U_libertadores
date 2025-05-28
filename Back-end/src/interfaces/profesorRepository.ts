import { Repository } from "./repositoryTypes";

export interface IProfesores{
    cod_p: number;
    nom_p: string;
    dir_p: string;
    tel_p: number;
    profecion: string;
    fech_nac: Date;
  }

export interface IProfesoresRepository extends Repository<IProfesores>{}

export interface IProfesoresService {
  createProfesores(profesores:IProfesores): Promise<IProfesores | null>
  findProfesores(): Promise<IProfesores[]>
  findProfesoresById(profesoresId: number): Promise<IProfesores | null>
  updateProfesores(profesoresId: number, updateData: Partial<IProfesores>):Promise<IProfesores | null>
  deleteProfesores(profesoresId: number):Promise<boolean | null>
}
