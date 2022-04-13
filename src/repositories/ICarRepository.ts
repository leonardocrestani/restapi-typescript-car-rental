type FindParamsType = {
    limit: number;
    offset: number;
    model?: string;
    color?: string;
    year?: number;
    accessories?: string
    passengers?: number,
}

type RegisterUpdateParamsType = {
    model: string,
    color: string,
    year: number,
    accessories: Array<object>,
    passengers: number
}

type CountRegistersType = {
    model?: string,
    color?: string,
    year?: number,
    accessories?: Array<object>,
    passengers?: number
}

type CarType = {
    _id: object,
    model: string,
    color: string,
    year: Number,
    accessories: Array<object>,
    passengers: Number
}

interface ICarRepository {
    find(params: FindParamsType): Promise<Array<object>>
    findById(id: string): Promise<CarType>
    countVehicles(params: CountRegistersType): Promise<number>
    register(params: RegisterUpdateParamsType): Promise<CarType>
    update(id: string, params: RegisterUpdateParamsType): Promise<CarType>
    remove(id: string): Promise<number>
}

export { ICarRepository, FindParamsType, RegisterUpdateParamsType, CarType };