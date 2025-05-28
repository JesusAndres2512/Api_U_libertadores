import { IProfesoresRepository, IProfesoresService } from "../interfaces/profesorRepository"
import { ProfesoresRepository } from "../repositories/profesorRepository"
import { EstudianteService } from "../services/estudianteService"
import { Request,Response } from "express"
import { ProfesoresService } from "../services/profesorService"

const profesoresRepository: IProfesoresRepository = new ProfesoresRepository()
const profesoreService: IProfesoresService = new ProfesoresService(profesoresRepository)


export const getProfesoresById = async (req: Request, res: Response): Promise<void> => {
   try {
       const {
          params:{profesoresId}
       } = req;
   
       const profesores = await profesoreService.findProfesoresById(parseInt(profesoresId as string));
   
       if(!profesores){
          res.status(404).json({
                                  status: false, 
                                  message: "Profesores no encontrados"
                                });
          return ;
       }
   
       res.status(200).json({
                              status: true,
                              data: profesores
                            });

   } catch (error) {
       console.log("Error al obtener Profesores: ",error);
       res.status(500).json({ message: "Ocurrió un error en el servidor." })
   }
}

export const getProfesores = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const profesores = await profesoreService.findProfesores();
    
        if(!profesores.length){
            res.status(404).json({
                                   status: false, 
                                   message: "Profesores no encontrados"
                                 });
            return;
        }
    
        res.status(200).json({
                                      status: true,
                                      data: profesores
                                    });
 
    } catch (error) {
        console.log("Error al obtener profesores: ",error);
        res.status(500).json({ message: "Ocurrió un error en el servidor." })
    }
 }

export const createProfesores = async (req: Request, res: Response): Promise<void> => {
    try {
      const profesores = await profesoreService.createProfesores(req.body);

      if(!profesores){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al crear el profesores"
        })
        return ;
      }

      res.status(201).json({
        status: true,
        data: profesores
      })

    } catch (error) {
        console.log("Error al crear profesores: ",error);
        res.status(500).json({ message: "Ocurrio un error en el servidor." })
        return ;
    }
}

export const updateProfesores = async (req: Request, res: Response): Promise<void> =>{
   try{
      const {
        params:{profesoresId}
      }= req;

      const profesores = await profesoreService.updateProfesores(parseInt(profesoresId as string), req.body);

      if(!profesores){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al actualizar el profesores"
        })
        return ;
      }

      res.status(200).json({
        status: true,
        data: profesores
      })

   }catch(error){
     console.log("Error al actualizar el profesores: ",error);
     res.status(500).json({ message: "Ocurrio un error en el servidor." })
   }

}

export const deleteProfesores = async (req: Request, res: Response): Promise<void> =>{
  try {
    const {
      params:{profesoresId}
    }= req;

    const profesores = await profesoreService.deleteProfesores(parseInt(profesoresId as string))

    if(!profesores){
      res.status(400).json({
        status: false,
        message: "Ocurrio un error al eliminar el profesores"
      })
      return ;
    }
     res.status(200).json({
      status: true,
      message: "profesor eliminado."
    })
  } catch (error) {
    console.log("Error al eliminar el profesores: ",error);
     res.status(500).json({ message: "Ocurrio un error en el servidor." })    
  }
}