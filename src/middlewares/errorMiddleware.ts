import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export default ((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    else {
        return res.status(500).json({ message: error.message });
    }
});