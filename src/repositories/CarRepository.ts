import CarSchema from '../schemas/Car';
import { ICarRepository, FindParamsType, RegisterUpdateParamsType } from './ICarRepository';

class CarRepository implements ICarRepository {
    async find({ limit, offset, ...param }: FindParamsType): Promise<object> {
        return await CarSchema.find(param, '-createdAt -updatedAt').limit(limit).skip(limit * (offset - 1));
    }

    async findById(id: string): Promise<object> {
        return await CarSchema.findById(id);
    }

    async countVehicles({ ...param }): Promise<number> {
        return await CarSchema.find(param).count();
    }

    async register(data: RegisterUpdateParamsType): Promise<object> {
        return await CarSchema.create(data);
    }

    async update(id: string, data: RegisterUpdateParamsType): Promise<object> {
        return await CarSchema.findOneAndUpdate({ _id: id }, data);
    }

    async remove(id: string): Promise<number> {
        return await CarSchema.findOneAndDelete({ _id: id });
    }
}

export default new CarRepository();