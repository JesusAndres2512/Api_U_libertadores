import { IProfesores, IProfesoresRepository, IProfesoresService } from "../interfaces/profesorRepository";

export class ProfesoresService implements IProfesoresService{

    private profesoresRepository: IProfesoresRepository

    constructor(profesoresRepository:IProfesoresRepository) {
       this.profesoresRepository = profesoresRepository
    }
    
    async findProfesoresById(profesoresId: number): Promise<IProfesores | null> {
        return await this.profesoresRepository.findById(profesoresId);
    }

    async findProfesores(): Promise<IProfesores[]> {
        return await this.profesoresRepository.find();
    }

    async createProfesores(profesores: IProfesores): Promise<IProfesores | null> {
        return await this.profesoresRepository.create(profesores);
    }
    
    async updateProfesores(profesoresId: number, updateData: Partial<IProfesores>): Promise<IProfesores | null> {
        return await this.profesoresRepository.update(profesoresId,updateData)
    }
    async deleteProfesores(profesoresId: number): Promise<boolean | null> {
        return await this.profesoresRepository.delete(profesoresId)
    }

}
