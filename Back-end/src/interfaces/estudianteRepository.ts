import { Repository } from "./repositoryTypes";

export interface IEstudiante{
    cod_e: number;
    nom_e: string;
    dir_e: string;
    tel_e: number;
    fech_nac: Date;
  }

export interface IEstudianteRepository extends Repository<IEstudiante>{}

export interface IEstudianteService {
  createEstudiante(estudiante:IEstudiante): Promise<IEstudiante | null>
  findEstudiantes(): Promise<IEstudiante[]>
  findEstudianteById(estudianteId: number): Promise<IEstudiante | null>
  updateEstudiante(estudianteId: number, updateData: Partial<IEstudiante>):Promise<IEstudiante | null>
  deleteEstudiante(estudianteId: number):Promise<boolean | null>
}
