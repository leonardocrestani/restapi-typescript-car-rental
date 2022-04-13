import PeopleRepository from "../repositories/PeopleRepository";
import NotFound from '../errors/NotFound';
const jwt = require('jsonwebtoken');
import authConfig from "../config/auth";

class AuthenticateService {

    public async authenticate(email: string, password: string): Promise<object> {
        console.log(email, password);
        const user: any = await PeopleRepository.findOne({ email: email, password: password });
        if (!user) {
            throw new NotFound('Could not authenticate, user not found');
        }
        const token = jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: 3600 });
        return { email: user.email, licensed: user.licensed, token };
    }

}

export default new AuthenticateService();