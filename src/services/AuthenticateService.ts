import PeopleRepository from "../repositories/PeopleRepository";
import NotFound from '../errors/NotFound';
import generateToken from '../utils/generateToken';
import bcrypt from 'bcrypt';

class AuthenticateService {

    public async authenticate(email: string, password: string): Promise<object> {
        const user: any = await PeopleRepository.findOne({ email: email });
        if (!user) {
            throw new NotFound('Could not authenticate, user not found');
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid password');
        }
        const token = generateToken(user);
        return { email: user.email, licensed: user.licensed, token };
    }

}

export default new AuthenticateService();