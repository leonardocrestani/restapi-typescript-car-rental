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

interface ICarRepository {
    find(params: FindParamsType): Promise<object>
    findById(id: string): Promise<object>
    countVehicles(params: CountRegistersType): Promise<number>
    register(params: RegisterUpdateParamsType): Promise<object>
    update(id: string, params: RegisterUpdateParamsType): Promise<object>
    remove(id: string): Promise<number>
}

export { ICarRepository, FindParamsType, RegisterUpdateParamsType };