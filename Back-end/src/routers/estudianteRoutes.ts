import {
    createEstudiante,
    deleteEstudiante,
    getEstudiantes,
    getEstudiantesById,
    updateEstudiante,
  } from '../controllers/estudianteController';
import {validateBodyEstudiantes} from "../middleware/validateBody"
import { Router } from 'express';
  
 const router = Router();
 
 router.post('/estudiante',validateBodyEstudiantes,createEstudiante);
 
 router.delete('/estudiante/:estudianteId', deleteEstudiante);
 router.put('/estudiante/:estudianteId',updateEstudiante);
 router.get('/estudiante/:estudianteId', getEstudiantesById);
 router.get('/estudiante', getEstudiantes);
 
 export default router;
  
