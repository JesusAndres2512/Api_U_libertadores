import {
    createAsignatura,
    deleteAsignatura,
    getAsignaturaById,
    getAsignatura,
    updateAsignatura
  } from '../controllers/asignaturaController';
import {validateBodyAsignaturas} from "../middleware/validateBody"
import { Router } from 'express';
  
 const router = Router();
 
 router.post('/asignatura',validateBodyAsignaturas,createAsignatura);
 
 router.delete('/asignatura/:asignaturaId', deleteAsignatura);
 router.put('/asignatura/:asignaturaId',updateAsignatura);
 router.get('/asignatura/:asignaturaId', getAsignaturaById);
 router.get('/asignatura', getAsignatura);
 
 export default router;
  
