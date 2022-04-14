import PeopleRepository from "../repositories/PeopleRepository";
import NotFound from '../errors/NotFound';
import generateToken from '../utils/generateToken';

class AuthenticateService {

    public async authenticate(email: string, password: string): Promise<object> {
        const user: any = await PeopleRepository.findOne({ email: email, password: password });
        if (!user) {
            throw new NotFound('Could not authenticate, user not found');
        }
        const token = generateToken(user);
        return { email: user.email, licensed: user.licensed, token };
    }

}

export default new AuthenticateService();