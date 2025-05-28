import { IInscribeRepository, IInscribeService } from "../interfaces/inscribeRepository"
import { InscribeRepository } from "../repositories/inscribeRepository"
import { InscribeService } from "../services/inscribeService"
import { Request,Response } from "express"

const inscribeRepository: IInscribeRepository = new InscribeRepository()
const inscribeService: IInscribeService = new InscribeService(inscribeRepository)


export const getInscribeById = async (req: Request, res: Response): Promise<void> => {
   try {
       const {
          params:{estudianteId}
       } = req;
   
       const estudiante = await inscribeService.findAsignaturaById(parseInt(estudianteId as string));
   
       if(!estudiante){
          res.status(404).json({
                                  status: false, 
                                  message: "Estudiantes no encontrados"
                                });
          return ;
       }
   
       res.status(200).json({
                              status: true,
                              data: estudiante
                            });

   } catch (error) {
       console.log("Error al obtener estudiantes: ",error);
       res.status(500).json({ message: "Ocurrió un error en el servidor." })
   }
}

export const getInscribe = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const estudiante = await inscribeService.findAsignatura();
    
        if(!estudiante.length){
            res.status(404).json({
                                   status: false, 
                                   message: "Estudiantes no encontrados"
                                 });
            return;
        }
    
        res.status(200).json({
                                      status: true,
                                      data: estudiante
                                    });
 
    } catch (error) {
        console.log("Error al obtener estudiantes: ",error);
        res.status(500).json({ message: "Ocurrió un error en el servidor." })
    }
 }

export const createInscripcion = async (req: Request, res: Response): Promise<void> => {
    try {
      const estudiante = await inscribeService.createInscripcion(req.body);

      if(!estudiante){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al crear el estudiante"
        })
        return ;
      }

      res.status(201).json({
        status: true,
        data: estudiante
      })

    } catch (error) {
        console.log("Error al crear estudiante: ",error);
        res.status(500).json({ message: "Ocurrio un error en el servidor." })
        return ;
    }
}

export const updateInscribe = async (req: Request, res: Response): Promise<void> =>{
   try{
      const {
        params:{estudianteId}
      }= req;

      const estudiante = await inscribeService.updateAsignatura(parseInt(estudianteId as string), req.body);

      if(!estudiante){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al actualizar el estudiante"
        })
        return ;
      }

      res.status(200).json({
        status: true,
        data: estudiante
      })

   }catch(error){
     console.log("Error al actualizar el estudiante: ",error);
     res.status(500).json({ message: "Ocurrio un error en el servidor." })
   }

}
