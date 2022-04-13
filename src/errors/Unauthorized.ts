import { CustomError } from './CustomError';

export default class Unauthorized extends CustomError {
    errorName = 'Unauthorized';
    statusCode = 401;
    constructor(message: string) {
        super(message);
    }
}