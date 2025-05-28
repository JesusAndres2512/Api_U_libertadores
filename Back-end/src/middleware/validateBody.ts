import Joi from "joi";
import { Request, Response, NextFunction } from 'express';

const EstudianteSchema = Joi.object({
  nom_e: Joi.string().required(),
  dir_e: Joi.string().required(),
  tel_e: Joi.number().required(),
  fech_nac: Joi.date().iso().required(),
});

const ProfesoresSchema = Joi.object({
  nom_p: Joi.string().required(),
  dir_p: Joi.string().required(),
  tel_p: Joi.number().required(),
  profecion: Joi.string().required(),
  fech_nac: Joi.date().iso().required(),
})

const AsignaturaSchema = Joi.object({
  nom_a: Joi.string().required(),
  int_h: Joi.number().required(),
  creditos: Joi.number().required(),
})

const InscribePutSchema = Joi.object({
  n1: Joi.number().required(),
  n2: Joi.number().required(),
  n3: Joi.number().required(),
})

const InscribeSchema = Joi.object({
  cod_e : Joi.number().required(),
  cod_a : Joi.number().required(),
  cod_p : Joi.number().required(),
  grupo :Joi.number().required(),
  n1: Joi.number().required(),
  n2: Joi.number().required(),
  n3: Joi.number().required(),
})


const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

const imparteSchema = Joi.object({
    cod_p: Joi.number().integer().required(),
    cod_a: Joi.number().integer().required(),
    grupo: Joi.number().integer().required(),
    hora_inicio: Joi.string().pattern(timePattern).required()
        .messages({
            "string.pattern.base": "La hora de inicio debe estar en el formato HH:mm:ss"
        }),
    hora_fin: Joi.string().pattern(timePattern).required()
        .messages({
            "string.pattern.base": "La hora de fin debe estar en el formato HH:mm:ss"
        })
}).custom((value, helpers) => {
    // Validar que hora_inicio < hora_fin
    const [horaInicio, minutoInicio, segundoInicio] = value.hora_inicio.split(':').map(Number);
    const [horaFin, minutoFin, segundoFin] = value.hora_fin.split(':').map(Number);

    const inicioEnSegundos = horaInicio * 3600 + minutoInicio * 60 + segundoInicio;
    const finEnSegundos = horaFin * 3600 + minutoFin * 60 + segundoFin;

    if (inicioEnSegundos >= finEnSegundos) {
        return helpers.error('any.invalid', { message: 'La hora de inicio debe ser menor que la hora de fin' });
    }

    return value;
});

const ImpartePutSchema = Joi.object({
  grupo: Joi.number().required(),
  hora_inicio: Joi.string().pattern(timePattern).required()
  .messages({
      "string.pattern.base": "La hora de inicio debe estar en el formato HH:mm:ss"
  }),
  hora_fin: Joi.string().pattern(timePattern).required()
    .messages({
        "string.pattern.base": "La hora de fin debe estar en el formato HH:mm:ss"
    })
  }).custom((value, helpers) => {
  // Validar que hora_inicio < hora_fin
  const [horaInicio, minutoInicio, segundoInicio] = value.hora_inicio.split(':').map(Number);
  const [horaFin, minutoFin, segundoFin] = value.hora_fin.split(':').map(Number);
  
  const inicioEnSegundos = horaInicio * 3600 + minutoInicio * 60 + segundoInicio;
  const finEnSegundos = horaFin * 3600 + minutoFin * 60 + segundoFin;
  
  if (inicioEnSegundos >= finEnSegundos) {
    return helpers.error('any.invalid', { message: 'La hora de inicio debe ser menor que la hora de fin' });
  }
  
  return value;
})
  
export const validateBodyImparte = (req: Request, res: Response, next: NextFunction):void => {
  const { error } = imparteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message  });
    return; 
  }
  next();
};

export const validateBodyImpartePut = (req: Request, res: Response, next: NextFunction):void => {
  const { error } = ImpartePutSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message  });
    return; 
  }
  next();
};

export const validateBodyEstudiantes = (req: Request, res: Response, next: NextFunction):void => {
  const { error } = EstudianteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details });
    return; 
  }
  next();
};

export const validateBodyProfesores = (req: Request, res: Response, next: NextFunction):void => {
  const { error } = ProfesoresSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details });
    return; 
  }
  next();
};

export const validateBodyAsignaturas = (req: Request, res: Response, next: NextFunction):void => {
  const { error } = AsignaturaSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details });
    return; 
  }
  next();
};

export const validateBodyInscribe = (req: Request, res: Response, next: NextFunction):void => {
  const { error } = InscribeSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details });
    return; 
  }
  next();
};

export const validateBodyInscribePut = (req: Request, res: Response, next: NextFunction):void => {
  const { error } = InscribePutSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details });
    return; 
  }
  next();
};