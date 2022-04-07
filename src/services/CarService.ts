import CarRepository from '../repositories/CarRepository';

class CarService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const vehicles = await CarRepository.find(params);
        const total = { total: await CarRepository.countVehicles() };
        const object = Object.assign({ vehicles }, total, { limit, offset });
        return object;
    }
}

export default new CarService();