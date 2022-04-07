import { Request, Response } from 'express';
import PeopleService from '../services/PeopleService';

class PeopleController {
    public async find(req: Request, res: Response): Promise<Response> {
        try {
            const people = await PeopleService.find(req.query);
            return res.status(200).json(people);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async register(req: Request, res: Response): Promise<Response> {
        const data: object = req.body;
        try {
            const newPeople = await PeopleService.register(data);
            return res.status(201).json(newPeople);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new PeopleController();