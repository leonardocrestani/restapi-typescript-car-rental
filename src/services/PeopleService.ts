import mongoose from 'mongoose';
import PeopleRepository from '../repositories/PeopleRepository';
import calculateAge from '../utils/calculateAge';
import cpfValidator from '../utils/cpfValidator';
import passwordValidator from '../utils/passwordValidatorString';

class PeopleService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const peoples = await PeopleRepository.find(params);
        const total = { total: await PeopleRepository.countPeoples() };
        const object = Object.assign({ peoples }, total, { limit, offset });
        return object;
    }

    public async findById(id: string): Promise<object> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Id pattern does not match');
        }
        const people = await PeopleRepository.findById(id);
        if (!people) {
            throw new Error('Informed people not found');
        }
        return people;
    }

    public async register(data: any): Promise<object> {
        const date: [string, string, string] = data.birthDate.split('/');
        const age = calculateAge(...date);
        if (age < 18) {
            throw new Error('User must have at least 18 years');
        }
        if (passwordValidator(data.password)) {
            throw new Error('Password must have only numbers');
        }
        if (!cpfValidator(data.cpf)) {
            throw new Error('Invalid CPF');
        }
        const people = await PeopleRepository.register(data);
        return people;
    }

    public async update(id: string, data: any): Promise<object> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Id pattern does not match');
        }
        if (data.birthDate) {
            console.log("a")
            const date: [string, string, string] = data.birthDate.split('/');
            const age = calculateAge(...date);
            if (age < 18) {
                throw new Error('User must have at least 18 years');
            }
        }
        if (data.password) {
            if (passwordValidator(data.password)) {
                throw new Error('Password must have only numbers');
            }
        }
        if (data.cpf) {
            if (!cpfValidator(data.cpf)) {
                throw new Error('Invalid CPF');
            }
        }
        const operation = await PeopleRepository.update(id, data);
        if (!operation) {
            throw new Error('Could not update car');
        }
        return await PeopleRepository.findById(id);
    }

    public async remove(id: string): Promise<void> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new Error('Id pattern does not match');
        }
        const operation = await PeopleRepository.remove(id);
        if (!operation) {
            throw new Error('Could not remove, client not found');
        }
        return;
    }
}

export default new PeopleService();