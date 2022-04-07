type FindParamsType = {
    limit: number;
    offset: number;
    model?: string;
    color?: string;
    year?: number;
    accessories?: string
    passengers?: number,
}

interface ICarRepository {
    find(params: FindParamsType): Promise<object>
}

export { ICarRepository, FindParamsType };