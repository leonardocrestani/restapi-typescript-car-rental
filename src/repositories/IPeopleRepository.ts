import { licensedEnum } from '../enums/licensedEnum';

type FindParamsType = {
    limit: number;
    offset: number;
    name?: string;
    cpf?: string;
    email?: string;
    licensed?: string
}

type RegisterUpdateParamsType = {
    name: string,
    cpf: string,
    birthDate: Date,
    email: string,
    password: string,
    licensed: licensedEnum
}

interface IPeopleRepository {
    find(params: FindParamsType): Promise<object>
    findById(id: string): Promise<object>
    countPeoples(): Promise<number>
    register(params: RegisterUpdateParamsType): Promise<object>
    update(id: string, params: RegisterUpdateParamsType): Promise<object>
    remove(id: string): Promise<number>
}

export { IPeopleRepository, FindParamsType, RegisterUpdateParamsType };