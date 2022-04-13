import { Request, Response, NextFunction } from 'express';
import AuthenticateService from '../services/AuthenticateService';

class AuthenticateController {
    public async authenticate(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { email, password } = req.body;
        try {
            const auth = await AuthenticateService.authenticate(email, password);
            return res.status(201).json({ auth });
        }
        catch (error) {
            next(error);
        }
    }
}

export default new AuthenticateController();