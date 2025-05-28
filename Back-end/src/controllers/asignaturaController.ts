import { IAsignatura, IAsignaturaService, IAsignaturaRepository } from "../interfaces/asignaturaRepository"
import { AsignaturaRepository } from "../repositories/asignaturaRepository"
import { AsignaturaService } from "../services/asignaturaService"
import { Request,Response } from "express"

const asignaturaRepository: IAsignaturaRepository = new AsignaturaRepository()
const asignaturaService: IAsignaturaService = new AsignaturaService(asignaturaRepository)


export const getAsignaturaById = async (req: Request, res: Response): Promise<void> => {
   try {
       const {
          params:{asignaturaId}
       } = req;
   
       const asignatura = await asignaturaService.findAsignaturaById(parseInt(asignaturaId as string));
   
       if(!asignatura){
          res.status(404).json({
                                  status: false, 
                                  message: "asignatura no encontrada"
                                });
          return ;
       }
   
       res.status(200).json({
                              status: true,
                              data: asignatura
                            });

   } catch (error) {
       console.log("Error al obtener asignatura: ",error);
       res.status(500).json({ message: "Ocurrió un error en el servidor." })
   }
}

export const getAsignatura = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const asignatura = await asignaturaService.findAsignatura();
    
        if(!asignatura.length){
            res.status(404).json({
                                   status: false, 
                                   message: "asignatura no encontrada"
                                 });
            return;
        }
    
        res.status(200).json({
                                      status: true,
                                      data: asignatura
                                    });
 
    } catch (error) {
        console.log("Error al obtener asignatura: ",error);
        res.status(500).json({ message: "Ocurrió un error en el servidor." })
    }
 }

export const createAsignatura = async (req: Request, res: Response): Promise<void> => {
    try {
      const asignatura = await asignaturaService.createAsignatura(req.body);

      if(!asignatura){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al crear la asignatura"
        })
        return ;
      }

      res.status(201).json({
        status: true,
        data: asignatura
      })

    } catch (error) {
        console.log("Error al crear asignatura: ",error);
        res.status(500).json({ message: "Ocurrio un error en el servidor." })
        return ;
    }
}

export const updateAsignatura = async (req: Request, res: Response): Promise<void> =>{
   try{
      const {
        params:{asignaturaId}
      }= req;

      const asignatura = await asignaturaService.updateAsignatura(parseInt(asignaturaId as string), req.body);

      if(!asignatura){
        res.status(400).json({
          status: false,
          message: "Ocurrio un error al actualizar el asignatura"
        })
        return ;
      }

      res.status(200).json({
        status: true,
        data: asignatura
      })

   }catch(error){
     console.log("Error al actualizar el asignatura: ",error);
     res.status(500).json({ message: "Ocurrio un error en el servidor." })
   }

}

export const deleteAsignatura = async (req: Request, res: Response): Promise<void> =>{
  try {
    const {
      params:{asignaturaId}
    }= req;

    const asignatura = await asignaturaService.deleteAsignatura(parseInt(asignaturaId as string))

    if(!asignatura){
      res.status(400).json({
        status: false,
        message: "Ocurrio un error al eliminar la asignatura"
      })
      return ;
    }
     res.status(200).json({
      status: true,
      message: "Asignatura eliminada."
    })
  } catch (error) {
    console.log("Error al eliminar el asignatura: ",error);
     res.status(500).json({ message: "Ocurrio un error en el servidor." })    
  }
}