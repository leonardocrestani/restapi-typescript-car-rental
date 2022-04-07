import CarRepository from '../repositories/CarRepository';
import mongoose from 'mongoose';

class CarService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const vehicles = await CarRepository.find(params);
        const total = { total: await CarRepository.countVehicles() };
        const object = Object.assign({ vehicles }, total, { limit, offset });
        return object;
    }

    public async register(data: any): Promise<object> {
        if (data.year < 1950 && data.year > 2022) {
            throw new Error('Invalid year');
        }
        return await CarRepository.register(data);
    }

    public async remove(id: string): Promise<void> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Id pattern does not match');
        }
        const operation = await CarRepository.remove(id);
        if (!operation) {
            throw new Error('Could not remove, client not found');
        }
        return;
    }
}

export default new CarService();