import {
    createImpartir,
    deleteImparte,
    getImparte,
    getImparteById,
    updateImparte
  } from '../controllers/imparteController';
import {validateBodyImparte,validateBodyImpartePut} from "../middleware/validateBody"
import { Router } from 'express';
  
 const router = Router();
 
 router.post('/profesor/imparte',validateBodyImparte,createImpartir);
 
 router.put('/profesor/imparte/:profesorId',validateBodyImpartePut,updateImparte);
 router.get('/profesor/imparte/:profesorId', getImparteById);
 router.get('/profesor/imparte', getImparte);
 router.delete('/profesor/imparte/:profesorId', deleteImparte);
 
 export default router;
  
