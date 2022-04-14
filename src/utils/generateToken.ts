const jwt = require('jsonwebtoken');
import authConfig from '../config/auth';

export default (user: any): Promise<string> => {
    const token = jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: 3600 });
    return token;
}