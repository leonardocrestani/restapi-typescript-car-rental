import { licensedEnum } from '../enums/licensedEnum';

type FindParamsType = {
    limit: number;
    offset: number;
    name?: string;
    cpf?: string;
    email?: string;
    licensed?: string
}

type FindOneParamsType = {
    email?: string,
    password?: string
}

type RegisterUpdateParamsType = {
    name: string,
    cpf: string,
    birthDate: Date,
    email: string,
    password: string,
    licensed: licensedEnum
}

type PeopleType = {
    _id: object,
    name: string,
    cpf: string,
    birthDate: Date,
    email: string,
    password: string,
    licensed: licensedEnum
}

interface IPeopleRepository {
    find(params: FindParamsType): Promise<Array<PeopleType>>
    findById(id: string): Promise<PeopleType>
    findOne(params: FindOneParamsType): Promise<PeopleType>
    countPeoples(): Promise<number>
    register(params: RegisterUpdateParamsType): Promise<PeopleType>
    update(id: string, params: RegisterUpdateParamsType): Promise<PeopleType>
    remove(id: string): Promise<number>
}

export { IPeopleRepository, FindParamsType, FindOneParamsType, RegisterUpdateParamsType, PeopleType };