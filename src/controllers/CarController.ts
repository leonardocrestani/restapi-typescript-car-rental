import { Request, Response } from 'express';
import CarService from '../services/CarService';


class CarController {
    public async find(req: Request, res: Response): Promise<Response> {
        try {
            const car = await CarService.find(req.query);
            return res.status(200).json(car);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new CarController();