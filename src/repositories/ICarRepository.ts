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

interface ICarRepository {
    find(params: FindParamsType): Promise<object>
    register(params: RegisterUpdateParamsType): Promise<object>
}

export { ICarRepository, FindParamsType, RegisterUpdateParamsType };