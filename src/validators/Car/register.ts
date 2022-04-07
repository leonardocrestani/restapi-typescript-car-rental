import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            model: Joi.string().trim().required(),
            color: Joi.string().trim().required(),
            year: Joi.number().required(),
            accessories: Joi.array().items(Joi.object({ description: Joi.string().trim().required() }).required()).unique('description').required(),
            passengers: Joi.number().required(),
        });
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