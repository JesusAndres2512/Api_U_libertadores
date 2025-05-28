import {
   createProfesores,
   deleteProfesores,
   getProfesores,
   getProfesoresById,
   updateProfesores
  } from '../controllers/profesoresController';
import {validateBodyProfesores} from "../middleware/validateBody"
import { Router } from 'express';
  
 const router = Router();
 
 router.post('/profesor',validateBodyProfesores,createProfesores);
 
 router.delete('/profesor/:profesoresId', deleteProfesores);
 router.put('/profesor/:profesoresId',updateProfesores);
 router.get('/profesor/:profesoresId', getProfesoresById);
 router.get('/profesor', getProfesores);
 
 export default router;
  
