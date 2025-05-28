import {
    createInscripcion,
    getInscribe,
    getInscribeById,
    updateInscribe
  } from '../controllers/inscribeController';
import {validateBodyInscribe,validateBodyInscribePut} from "../middleware/validateBody"
import { Router } from 'express';
  
 const router = Router();
 
 router.post('/estudiante/inscribe',validateBodyInscribe,createInscripcion);
 
 router.put('/estudiante/inscribe/:estudianteId',validateBodyInscribePut,updateInscribe);
 router.get('/estudiante/inscribe/:estudianteId', getInscribeById);
 router.get('/estudiante/inscribe', getInscribe);
 
 export default router;
  
