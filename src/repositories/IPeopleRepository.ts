import { licensedEnum } from '../enums/licensedEnum';

type FindParamsType = {
    limit: number;
    offset: number;
    name?: string;
    cpf?: string;
    email?: string;
    licensed?: string
}

type RegisterBodyType = {
    name: string,
    cpf: string,
    birthDate: Date,
    email: string,
    password: string,
    licensed: licensedEnum
}

interface IPeopleRepository {
    find(params: FindParamsType): Promise<object>
    register(params: RegisterBodyType): Promise<object>
}

export { IPeopleRepository, FindParamsType, RegisterBodyType };