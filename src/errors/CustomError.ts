export abstract class CustomError extends Error {

    abstract errorName: string;
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
    }
}