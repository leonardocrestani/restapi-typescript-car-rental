import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { licensedEnum } from '../../enums/licensedEnum';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            name: Joi.string().trim().optional(),
            cpf: Joi.string().trim().optional(),
            birthDate: Joi.date().optional(),
            email: Joi.string().trim().email().optional(),
            password: Joi.string().min(6).trim().optional(),
            licensed: Joi.string().valid(...Object.values(licensedEnum)).optional()
        }).min(1);
        const { error } = await schema.validate(req.body, { abortEarly: true });
        if (error) throw error
        return next();
    }
    catch (erro) {
        return res.status(400).json(
            erro.details.map((detail: any) => ({
                message: detail.message,
                path: detail.path
            }))
        )
    }
}