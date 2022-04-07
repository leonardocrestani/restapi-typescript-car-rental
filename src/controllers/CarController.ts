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

    public async register(req: Request, res: Response): Promise<Response> {
        const data: object = req.body;
        try {
            const newCar = await CarService.register(data);
            return res.status(202).json(newCar);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id }: any = req.params;
        const data: object = req.body;
        try {
            const updatedCar = await CarService.update(id, data);
            return res.status(200).json(updatedCar);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async remove(req: Request, res: Response): Promise<Response> {
        const { id }: any = req.params;
        try {
            await CarService.remove(id);
            return res.status(204).end();
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new CarController();