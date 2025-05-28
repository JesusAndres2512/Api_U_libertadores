import { IEstudianteRepository, IEstudianteService } from "../interfaces/estudianteRepository"
import { EstudianteRepository } from "../repositories/estudianteRepository"
import { EstudianteService } from "../services/estudianteService"
import { Request,Response } from "express"

const estudianteRepository: IEstudianteRepository = new EstudianteRepository()
const estudianteService: IEstudianteService = new EstudianteService(estudianteRepository)


export const getEstudiantesById = async (req: Request, res: Response): Promise<void> => {
   try {
       const {
          params:{estudianteId}
       } = req;
   
       const estudiante = await estudianteService.findEstudianteById(parseInt(estudianteId as string));
   
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

export const getEstudiantes = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const estudiante = await estudianteService.findEstudiantes();
    
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

export const createEstudiante = async (req: Request, res: Response): Promise<void> => {
    try {
      const estudiante = await estudianteService.createEstudiante(req.body);

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

export const updateEstudiante = async (req: Request, res: Response): Promise<void> =>{
   try{
      const {
        params:{estudianteId}
      }= req;

      const estudiante = await estudianteService.updateEstudiante(parseInt(estudianteId as string), req.body);

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

export const deleteEstudiante = async (req: Request, res: Response): Promise<void> =>{
  try {
    const {
      params:{estudianteId}
    }= req;

    const estudiante = await estudianteService.deleteEstudiante(parseInt(estudianteId as string))

    if(!estudiante){
      res.status(400).json({
        status: false,
        message: "Ocurrio un error al eliminar el estudiante"
      })
      return ;
    }
     res.status(200).json({
      status: true,
      message: "Estudiante eliminado."
    })
  } catch (error) {
    console.log("Error al eliminar el estudiante: ",error);
     res.status(500).json({ message: "Ocurrio un error en el servidor." })    
  }
}