import mongoose from 'mongoose';
import PeopleRepository from '../repositories/PeopleRepository';
import cpfValidator from '../utils/cpfValidator';
import passwordValidator from '../utils/passwordValidatorString';
import calculateOffsets from '../utils/calculateOffsets';
import generateToken from '../utils/generateToken';
import NotFound from '../errors/NotFound';
import UnprocessableEntity from '../errors/UnprocessableEntity';

class PeopleService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const peoples = await PeopleRepository.find(params);
        const total = { total: await PeopleRepository.countPeoples() };
        const offsets = calculateOffsets(limit, offset, total.total);
        const object = Object.assign({ peoples }, total, { limit, offset, offsets });
        return object;
    }

    public async findById(id: string): Promise<object> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Id pattern does not match');
        }
        const people = await PeopleRepository.findById(id);
        if (!people) {
            throw new NotFound('Informed people not found');
        }
        return people;
    }

    public async register(data: any): Promise<object> {
        if (passwordValidator(data.password)) {
            throw new UnprocessableEntity('Password must have only numbers');
        }
        const exist = await PeopleRepository.findOne({ email: data.email });
        if (exist) {
            throw new Error('User already registered');
        }
        if (!cpfValidator(data.cpf)) {
            throw new UnprocessableEntity('Invalid CPF');
        }
        const people = await PeopleRepository.register(data);
        if (!people) throw new Error('Could not register');
        const token = generateToken(people);
        return { people, token };
    }

    public async update(id: string, data: any): Promise<object> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Id pattern does not match');
        }
        if (data.password) {
            if (passwordValidator(data.password)) {
                throw new UnprocessableEntity('Password must have only numbers');
            }
        }
        if (data.cpf) {
            if (!cpfValidator(data.cpf)) {
                throw new UnprocessableEntity('Invalid CPF');
            }
        }
        const operation = await PeopleRepository.update(id, data);
        if (!operation) {
            throw new NotFound('Could not update car, car not found');
        }
        return await PeopleRepository.findById(id);
    }

    public async remove(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Id pattern does not match');
        }
        const operation = await PeopleRepository.remove(id);
        if (!operation) {
            throw new NotFound('Could not remove, client not found');
        }
        return;
    }
}

export default new PeopleService();