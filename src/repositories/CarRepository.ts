import CarSchema from '../schema/Car';
import { ICarRepository, FindParamsType, RegisterUpdateParamsType } from './ICarRepository';

class CarRepository implements ICarRepository {
    async find({ limit, offset, ...param }: FindParamsType): Promise<object> {
        return await CarSchema.find(param).limit(limit).skip(limit * (offset - 1));
    }

    async findById(id: string): Promise<object> {
        return await CarSchema.findById(id);
    }

    async countVehicles(): Promise<number> {
        return await CarSchema.find().count();
    }

    async register(data: RegisterUpdateParamsType): Promise<object> {
        return await CarSchema.create(data);
    }
}

export default new CarRepository();