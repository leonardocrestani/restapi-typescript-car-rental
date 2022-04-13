import { licensedEnum } from '../enums/licensedEnum';

type FindParamsType = {
    limit: number;
    offset: number;
    name?: String;
    cpf?: String;
    email?: String;
    licensed?: String
}

type FindOneParamsType = {
    email: String,
    password: String
}

type RegisterUpdateParamsType = {
    name: String,
    cpf: String,
    birthDate: Date,
    email: String,
    password: String,
    licensed: licensedEnum
}

type PeopleType = {
    _id: object,
    name: String,
    cpf: String,
    birthDate: Date,
    email: String,
    password: String,
    licensed: licensedEnum
}

interface IPeopleRepository {
    find(params: FindParamsType): Promise<Array<PeopleType>>
    findById(id: String): Promise<PeopleType>
    findOne(params: FindOneParamsType): Promise<PeopleType>
    countPeoples(): Promise<Number>
    register(params: RegisterUpdateParamsType): Promise<PeopleType>
    update(id: String, params: RegisterUpdateParamsType): Promise<PeopleType>
    remove(id: String): Promise<Number>
}

export { IPeopleRepository, FindParamsType, FindOneParamsType, RegisterUpdateParamsType, PeopleType };