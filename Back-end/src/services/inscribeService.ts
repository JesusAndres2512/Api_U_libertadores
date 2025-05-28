import { IInscribeService ,IInscribe,IInscribeRepository } from "../interfaces/inscribeRepository";

export class InscribeService implements IInscribeService{

    private inscribeRepository: IInscribeRepository

    constructor(inscribeRepository:IInscribeRepository) {
       this.inscribeRepository = inscribeRepository
    }
    
    async createInscripcion(inscribir: IInscribe): Promise<IInscribe | null> {
        return await this.inscribeRepository.create(inscribir)
    }

    async findAsignaturaById(estudianteId: number): Promise<IInscribe | null> {
        return await this.inscribeRepository.findById(estudianteId)
    }

    async findAsignatura(): Promise<IInscribe[]> {
        return await this.inscribeRepository.find()
    }

    async updateAsignatura(estudianteId: number, updateData: Partial<IInscribe>): Promise<IInscribe | null> {
        return await this.inscribeRepository.update(estudianteId,updateData)
    }

}
