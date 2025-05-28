import {Router} from "express";
import routerEstudiante from "./estudianteRoutes";
import routerProfesor from "./profesoresRoutes"
import routerAsignatura from "./asignaturaRoutes"
import routerInscribe from "./inscribeRoutes"
import routerImparte from "./imparteRoutes"

const router = Router();

router.use('/api/',routerEstudiante);
router.use('/api/',routerProfesor);
router.use('/api/',routerAsignatura);
router.use('/api/',routerInscribe)
router.use('/api/',routerImparte)

export default router;