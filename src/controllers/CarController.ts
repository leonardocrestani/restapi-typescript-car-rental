import { NextFunction, Request, Response } from 'express';
import CarService from '../services/CarService';

class CarController {
    public async find(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const car = await CarService.find(req.query);
            return res.status(200).json(car);
        }
        catch (error) {
            next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: any = req.params;
        try {
            const car = await CarService.findById(id);
            return res.status(200).json(car);
        }
        catch (error) {
            next(error);
        }
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const data: object = req.body;
        try {
            const newCar = await CarService.register(data);
            return res.status(201).json(newCar);
        }
        catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: any = req.params;
        const data: object = req.body;
        try {
            const updatedCar = await CarService.update(id, data);
            return res.status(200).json(updatedCar);
        }
        catch (error) {
            next(error);
        }
    }

    public async remove(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: any = req.params;
        try {
            await CarService.remove(id);
            return res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    }
}

export default new CarController();