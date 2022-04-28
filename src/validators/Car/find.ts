import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            model: Joi.string().trim().optional(),
            color: Joi.string().trim().optional(),
            year: Joi.number().optional(),
            description: Joi.string().optional(),
            passengers: Joi.number().optional(),
            limit: Joi.number().required(),
            offset: Joi.number().required(),
        });
        const { error } = await schema.validate(req.query, { abortEarly: true });
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