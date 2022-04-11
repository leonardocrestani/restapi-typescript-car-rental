import { CustomError } from './CustomError';

export class NotFound extends CustomError {
    errorName = 'NotFound';
    statusCode = 404;
    constructor(message: string) {
        super(message);
    }
}