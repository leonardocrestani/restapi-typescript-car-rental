import mongoose from 'mongoose';
import CarRepository from '../repositories/CarRepository';
import calculateOffsets from '../utils/calculateOffsets';
import NotFound from '../errors/NotFound';
import UnprocessableEntity from '../errors/UnprocessableEntity';

class CarService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const vehicles = await CarRepository.find(params);
        const total = { total: await CarRepository.countVehicles(params) };
        const offsets = calculateOffsets(limit, offset, total.total);
        const object = Object.assign({ vehicles }, total, { limit, offset, offsets });
        return object;
    }

    public async findById(id: string): Promise<object> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Id pattern does not match');
        }
        const car = await CarRepository.findById(id);
        if (!car) {
            throw new NotFound('Informed car not found');
        }
        return car;
    }

    public async register(data: any): Promise<object> {
        const car = await CarRepository.register(data);
        if (!car) {
            throw new Error('Could not register');
        }
        return car;
    }

    public async update(id: string, data: any): Promise<object> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Id pattern does not match');
        }
        const operation = await CarRepository.update(id, data);
        if (!operation) {
            throw new NotFound('Could not update car, car not found');
        }
        return await CarRepository.findById(id);
    }

    public async remove(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Id pattern does not match');
        }
        const operation = await CarRepository.remove(id);
        if (!operation) {
            throw new NotFound('Could not remove, car not found');
        }
        return;
    }
}

export default new CarService();