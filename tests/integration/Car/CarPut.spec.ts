import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';
import Car from '../../../src/schemas/Car';

describe('Car PUT', () => {

    let token: string;
    let carId: string;

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
        const auth = await request(app).post('/api/v1/authenticate').send({ email: "leonardo@email.com", password: "123456" });
        token = auth.body.token;
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
        carId = response.body._id;
    });

    afterAll(async () => {
        await Car.deleteMany();
        await People.deleteMany();
        mongoose.connection.close();
    });

    it('Given the route (PUT)/api/v1/car/:id when passed the ID and a body with new informations then should update the car', async () => {
        const newBody = {
            color: "preto",
            accessories: [{ "description": "Automatico" }, { "description": "Vidro eletrico" }]
        }
        const response = await request(app).put(`/api/v1/car/${carId}`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(carId);
        expect(response.body.model).toBe('GM S10 2.8');
        expect(response.body.color).toBe('preto');
        expect(response.body.accessories.length).toBeGreaterThan(0);
    });

    it('Given the route (PUT)/api/v1/car/:id when passed ID and not passed a body or passed and empty body then should return an error', async () => {
        const response = await request(app).put(`/api/v1/car/${carId}756756`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"value\" must have at least 1 key');
    });

    it('Given the route (PUT)/api/v1/car/:id when passed incorrect ID path then should return an error', async () => {
        const newBody = {
            color: "preto",
            accessories: [{ "description": "Automatico" }, { "description": "Vidro eletrico" }]
        }
        const response = await request(app).put(`/api/v1/car/${carId}756756`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Id pattern does not match');
    });

    it('Given the route (PUT)/api/v1/car/:id when passed inexistent ID then should return an error', async () => {
        const newBody = {
            color: "preto",
            accessories: [{ "description": "Automatico" }, { "description": "Vidro eletrico" }]
        }
        const response = await request(app).put('/api/v1/car/62698bdfa3a3ce880d0a64f4').set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Could not update car, car not found');
    });

});