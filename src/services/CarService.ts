import CarRepository from '../repositories/CarRepository';

class CarService {
    public async find(params: any): Promise<object> {
        const { limit, offset } = params;
        const vehicles = await CarRepository.find(params);
        const total = { total: await CarRepository.countVehicles() };
        const object = Object.assign({ vehicles }, total, { limit, offset });
        return object;
    }

    public async register(data: any): Promise<object> {
        if (data.year < 1950 && data.year > 2022) {
            throw new Error('Invalid year');
        }
        return await CarRepository.register(data);
    }
}

export default new CarService();