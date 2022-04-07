import CarSchema from '../schema/Car';
import { ICarRepository, FindParamsType } from './ICarRepository';

class CarRepository implements ICarRepository {
    async find({ limit, offset, ...param }: FindParamsType): Promise<object> {
        return await CarSchema.find(param).limit(limit).skip(limit * (offset - 1));
    }

    async countVehicles(): Promise<number> {
        return await CarSchema.find().count();
    }
}

export default new CarRepository();