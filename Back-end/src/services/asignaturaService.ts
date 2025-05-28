import { IAsignatura, IAsignaturaRepository, IAsignaturaService } from "../interfaces/asignaturaRepository";

export class AsignaturaService implements IAsignaturaService{

    private asignaturaRepository: IAsignaturaRepository

    constructor(asignaturaRepository:IAsignaturaRepository) {
       this.asignaturaRepository = asignaturaRepository
    }
    
   async createAsignatura(asignatura: IAsignatura): Promise<IAsignatura | null> {
       return await this.asignaturaRepository.create(asignatura);
   }

   async deleteAsignatura(asignaturaId: number): Promise<boolean | null> {
       return await this.asignaturaRepository.delete(asignaturaId)
   }

   async findAsignatura(): Promise<IAsignatura[]> {
       return await this.asignaturaRepository.find()
   }

   async findAsignaturaById(asignaturaId: number): Promise<IAsignatura | null> {
       return await this.asignaturaRepository.findById(asignaturaId)
   }

   async updateAsignatura(asignaturaId: number, updateData: Partial<IAsignatura>): Promise<IAsignatura | null> {
       return await this.asignaturaRepository.update(asignaturaId, updateData)
   }

}
