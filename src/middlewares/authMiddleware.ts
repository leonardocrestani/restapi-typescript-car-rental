import { Request, Response, NextFunction } from 'express';
import Unauthorized from '../errors/Unauthorized';
const jwt = require('jsonwebtoken');
import authConfig from '../config/auth';

export default ((req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Unauthorized('No token provided');
    }
    const [bearer, token] = authHeader.split(' ');
    jwt.verify(token, authConfig.secret, (error: any) => {
        if (error) {
            throw new Unauthorized('Invalid token');
        }
        return next();
    });
});