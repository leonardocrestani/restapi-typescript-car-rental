import mongoose from 'mongoose';
import PeopleRepository from '../repositories/PeopleRepository';
import { calculateAge } from '../utils/calculateAge';

class PeopleService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const peoples = await PeopleRepository.find(params);
        const total = { total: await PeopleRepository.countPeoples() };
        const object = Object.assign({ peoples }, total, { limit, offset });
        return object;
    }

    public async register(data: any): Promise<object> {
        const date: [string, string, string] = data.birthDate.split('/');
        const idade = calculateAge(...date);
        if (idade < 18) {
            throw new Error('User must have at least 18 years');
        }
        const people = await PeopleRepository.register(data);
        return people;
    }
}

export default new PeopleService();