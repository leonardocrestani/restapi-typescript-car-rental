import { CustomError } from './CustomError';

export default class NotFound extends CustomError {
    errorName = 'NotFound';
    statusCode = 404;
    constructor(message: string) {
        super(message);
    }
}