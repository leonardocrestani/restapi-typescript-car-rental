import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            model: Joi.string().trim().optional(),
            color: Joi.string().trim().optional(),
            year: Joi.number().min(1950).max(2022).optional(),
            accessories: Joi.array().items(Joi.object({ description: Joi.string().trim().required() }).required()).unique('description').optional(),
            passengers: Joi.number().optional(),
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