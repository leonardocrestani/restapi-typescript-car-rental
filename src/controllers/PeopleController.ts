import { Request, Response, NextFunction } from 'express';
import PeopleService from '../services/PeopleService';

class PeopleController {
    public async find(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const people = await PeopleService.find(req.query);
            return res.status(200).json(people);
        }
        catch (error) {
            next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: any = req.params;
        try {
            const car = await PeopleService.findById(id);
            return res.status(200).json(car);
        }
        catch (error) {
            next(error);
        }
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const data: object = req.body;
        try {
            const newPeople = await PeopleService.register(data);
            return res.status(201).json(newPeople);
        }
        catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: any = req.params;
        const data: object = req.body;
        try {
            const updatedPeople = await PeopleService.update(id, data);
            return res.status(200).json(updatedPeople);
        }
        catch (error) {
            next(error);
        }
    }

    public async remove(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id }: any = req.params;
        try {
            await PeopleService.remove(id);
            return res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    }
}

export default new PeopleController();