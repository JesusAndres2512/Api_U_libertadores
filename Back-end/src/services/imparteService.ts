import { IImparte,IImparteRepository,IImparteService } from "../interfaces/imparteRepository";

export class ImparteService implements IImparteService{

    private imparteRepository: IImparteRepository

    constructor(imparteRepository: IImparteRepository) {
       this.imparteRepository = imparteRepository
    }
    
    async createImparte(imparte: IImparte): Promise<IImparte | null> {
        return await this.imparteRepository.create(imparte)
    }

    async findImparte(): Promise<IImparte[]> {
        return await this.imparteRepository.find()
    }

    async findImparteById(profesorId: number): Promise<IImparte | null> {
        return await this.imparteRepository.findById(profesorId)
    }

    async updateImparte(profesorId: number, updateData: Partial<IImparte>): Promise<IImparte | null> {
        return await this.imparteRepository.update(profesorId,updateData)
    }

    async deleteImparte(profesorId: number): Promise<boolean | null> {
        return await this.imparteRepository.delete(profesorId)
    }

}
