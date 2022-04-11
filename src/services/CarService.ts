import CarRepository from '../repositories/CarRepository';
import { NotFound } from '../errors/NotFound';
import mongoose from 'mongoose';

class CarService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const vehicles = await CarRepository.find(params);
        const total = { total: await CarRepository.countVehicles() };
        const object = Object.assign({ vehicles }, total, { limit, offset });
        return object;
    }

    public async findById(id: string): Promise<object> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Id pattern does not match');
        }
        const car = await CarRepository.findById(id);
        if (!car) {
            throw new NotFound('Informed car not found');
        }
        return car;
    }

    public async register(data: any): Promise<object> {
        if (data.year < 1950 && data.year > 2022) {
            throw new Error('Invalid year');
        }
        return await CarRepository.register(data);
    }

    public async update(id: string, data: any): Promise<object> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Id pattern does not match');
        }
        if (data.year < 1950 && data.year > 2022) {
            throw new Error('Invalid year');
        }
        const operation = await CarRepository.update(id, data);
        if (!operation) {
            throw new NotFound('Could not update car, car not found');
        }
        return await CarRepository.findById(id);
    }

    public async remove(id: string): Promise<void> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Id pattern does not match');
        }
        const operation = await CarRepository.remove(id);
        if (!operation) {
            throw new NotFound('Could not remove, car not found');
        }
        return;
    }
}

export default new CarService();