import PeopleSchema from '../schemas/People';
import { IPeopleRepository, FindParamsType, RegisterBodyType } from './IPeopleRepository';

class PeopleRepository implements IPeopleRepository {
    async find({ limit, offset }: FindParamsType): Promise<object> {
        return await PeopleSchema.find().select('-createdAt -updatedAt').limit(limit).skip(limit * (offset - 1));
    }

    async countPeoples(): Promise<number> {
        return await PeopleSchema.find().count();
    }

    async register(data: RegisterBodyType): Promise<object> {
        return await PeopleSchema.create(data);
    }
}

export default new PeopleRepository();