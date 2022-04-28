import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';
import Car from '../../../src/schemas/Car';

describe('Car POST', () => {

    let token: string;

    beforeAll(async () => {
        const user = {
            name: "Leonardo",
            cpf: "199.635.500-70",
            birthDate: "03/03/2002",
            email: "leonardo@email.com",
            password: "123456",
            licensed: "yes"
        }
        await request(app).post('/api/v1/people').send(user);
        const response = await request(app).post('/api/v1/authenticate').send({ email: "leonardo@email.com", password: "123456" });
        token = response.body.token;
    });

    beforeEach(async () => {
        await Car.deleteMany();
    });

    afterAll(async () => {
        await Car.deleteMany();
        await People.deleteMany();
        mongoose.connection.close();
    });

    it('Given the route (POST)/api/v1/car when the informations is passed then should registrate a new car', async () => {
        const car = {
            model: "GM S10 2.8",
            color: "branco",
            year: 2010,
            accessories: [
                { "description": "Ar-condicionado" }, { "description": "Vidro eletrico" }
            ],
            passengers: 5
        }
        const response = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
        expect(response.status).toBe(201);
        expect(response.body.model).toBe('GM S10 2.8');
        expect(response.body.accessories.length).toBeGreaterThan(0);
    });

    it('Given the route (POST)/api/v1/car when try to registrate a new car with less than one accessory then should return an error', async () => {
        const car = {
            model: "GM S10 2.8",
            color: "branco",
            year: 2010,
            accessories: [] as any,
            passengers: 5
        }
        const response = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"accessories\" does not contain 1 required value(s)');
    });

    it('Given the route (POST)/api/v1/car when try to registrate a new car with year smaller than 1950 or bigger than 2022 then should return an error', async () => {
        const car = {
            model: "GM S10 2.8",
            color: "branco",
            year: 2030,
            accessories: [
                { "description": "Ar-condicionado" }, { "description": "Vidro eletrico" }
            ],
            passengers: 5
        }
        const response = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"year\" must be less than or equal to 2022');
    });

    it('Given the route (POST)/api/v1/car when try to registrate a new car with repeated accessories then should return an error', async () => {
        const car = {
            model: "GM S10 2.8",
            color: "branco",
            year: 2010,
            accessories: [
                { "description": "Ar-condicionado" }, { "description": "Ar-condicionado" }
            ],
            passengers: 5
        }
        const response = await request(app).post('/api/v1/car').set('Authorization', `Bearer ${token}`).send(car);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"accessories[1]\" contains a duplicate value');
    });

});