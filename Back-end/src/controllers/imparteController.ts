import { IImparteRepository, IImparteService } from "../interfaces/imparteRepository"
import { ImparteRepository } from "../repositories/imparteRepository"
import { ImparteService } from "../services/imparteService"
import { Request,Response } from "express"

const imparteRepository: IImparteRepository = new ImparteRepository()
const imparteService: IImparteService = new ImparteService(imparteRepository)


export const getImparteById = async (req: Request, res: Response): Promise<void> => {
   try {
       const {
          params:{profesorId}
       } = req;
   
       const profesor = await imparteService.findImparteById(parseInt(profesorId as string));
   
       if(!profesor){
          res.status(404).json({
                                  status: false, 
                                  message: "Profesor no encontrados"
                                });
          return ;
       }
   
       res.status(200).json({
                              status: true,
                              data: profesor
                            });

   } catch (error) {
       console.log("Error al obtener profesor: ",error);
       res.status(500).json({ message: "Ocurrió un error en el servidor." })
   }
}

export const getImparte = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const profesor = await imparteService.findImparte();
    
        if(!profesor.length){
            res.status(404).json({
                                   status: false, 
                                   message: "Profesor no encontrados"
                                 });
            return;
        }
    
        res.status(200).json({
                                      status: true,
                                      data: profesor
                                    });
 
    } catch (error) {
        console.log("Error al obtener profesor: ",error);
        res.status(500).json({ message: "Ocurrió un error en el servidor." })
    }
 }

export const createImpartir = async (req: Request, res: Response): Promise<void> => {
    try {
      const profesor = await imparteService.createImparte(req.body);

      if(!profesor){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al crear el profesor"
        })
        return ;
      }

      res.status(201).json({
        status: true,
        data: profesor
      })

    } catch (error) {
        console.log("Error al crear profesor: ",error);
        res.status(500).json({ message: "Ocurrio un error en el servidor." })
        return ;
    }
}

export const updateImparte = async (req: Request, res: Response): Promise<void> =>{
   try{
      const {
        params:{profesorId}
      }= req;

      const profesor = await imparteService.updateImparte(parseInt(profesorId as string), req.body);

      if(!profesor){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al actualizar el profesor"
        })
        return ;
      }

      res.status(200).json({
        status: true,
        data: profesor
      })

   }catch(error){
     console.log("Error al actualizar el profesor: ",error);
     res.status(500).json({ message: "Ocurrio un error en el servidor." })
   }

}
export const deleteImparte = async (req: Request, res: Response): Promise<void> =>{
    try {
      const {
        params:{profesorId}
      }= req;
  
      const profesor = await imparteService.deleteImparte(parseInt(profesorId as string))
  
      if(!profesor){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al eliminar el profesor"
        })
        return ;
      }
       res.status(200).json({
        status: true,
        message: "Profesor eliminado."
      })
    } catch (error) {
      console.log("Error al eliminar el profesor: ",error);
       res.status(500).json({ message: "Ocurrio un error en el servidor." })    
    }
  }
