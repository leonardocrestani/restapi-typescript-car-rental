import { CustomError } from "./CustomError";

export default class UnprocessableEntity extends CustomError {
    errorName = 'UnprocessableEntity';
    statusCode = 422;
    constructor(message: string) {
        super(message);
    }
}