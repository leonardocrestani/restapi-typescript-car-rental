type FindParamsType = {
    limit: number;
    offset: number;
    model?: String;
    color?: String;
    year?: Number;
    accessories?: String
    passengers?: Number,
}

type RegisterUpdateParamsType = {
    model: String,
    color: String,
    year: Number,
    accessories: Array<object>,
    passengers: Number
}

type CountRegistersType = {
    model?: String,
    color?: String,
    year?: Number,
    accessories?: Array<Object>,
    passengers?: Number
}

type CarType = {
    _id: object,
    model: String,
    color: String,
    year: Number,
    accessories: Array<object>,
    passengers: Number
}

interface ICarRepository {
    find(params: FindParamsType): Promise<Array<object>>
    findById(id: String): Promise<CarType>
    countVehicles(params: CountRegistersType): Promise<Number>
    register(params: RegisterUpdateParamsType): Promise<CarType>
    update(id: String, params: RegisterUpdateParamsType): Promise<CarType>
    remove(id: String): Promise<Number>
}

export { ICarRepository, FindParamsType, RegisterUpdateParamsType, CarType };