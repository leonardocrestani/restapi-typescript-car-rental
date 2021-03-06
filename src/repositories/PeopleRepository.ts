import PeopleSchema from '../schemas/People';
import { IPeopleRepository, FindParamsType, FindOneParamsType, RegisterUpdateParamsType, PeopleType } from './IPeopleRepository';

class PeopleRepository implements IPeopleRepository {
    async find({ limit, offset }: FindParamsType): Promise<Array<PeopleType>> {
        return await PeopleSchema.find().select('-createdAt -updatedAt').limit(limit).skip(limit * (offset - 1));
    }

    async findById(id: string): Promise<PeopleType> {
        return await PeopleSchema.findById(id);
    }

    async findOne(params: FindOneParamsType): Promise<PeopleType> {
        return await PeopleSchema.findOne(params).select('+password');
    }

    async countPeoples(): Promise<number> {
        return await PeopleSchema.find().count();
    }

    async register(data: RegisterUpdateParamsType): Promise<PeopleType> {
        return await PeopleSchema.create(data);
    }

    async update(id: string, data: RegisterUpdateParamsType): Promise<PeopleType> {
        return await PeopleSchema.findOneAndUpdate({ _id: id }, data);
    }

    async remove(id: string): Promise<number> {
        return await PeopleSchema.findOneAndDelete({ _id: id });
    }
}

export default new PeopleRepository();