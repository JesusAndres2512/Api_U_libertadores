import { IEstudiante, IEstudianteRepository, IEstudianteService } from "../interfaces/estudianteRepository";

export class EstudianteService implements IEstudianteService{

    private estudianteRepository: IEstudianteRepository

    constructor(estudianteRepository:IEstudianteRepository) {
       this.estudianteRepository = estudianteRepository
    }
        
    async findEstudianteById(estudianteId?: number): Promise<IEstudiante | null> {
        return await this.estudianteRepository.findById(estudianteId);
    }

    async findEstudiantes(): Promise<IEstudiante[]> {
       return await this.estudianteRepository.find();
    }

    async createEstudiante(estudiante: IEstudiante): Promise<IEstudiante | null> {
        return await this.estudianteRepository.create(estudiante);
    }

    async updateEstudiante(estudianteId: number, updateData: Partial<IEstudiante>): Promise<IEstudiante | null> {
        return await this.estudianteRepository.update(estudianteId, updateData);
    }

    async deleteEstudiante(estudianteId: number): Promise<boolean | null> {
        return await this.estudianteRepository.delete(estudianteId);
    }

}
