import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';
import Car from '../../../src/schemas/Car';

describe('Car DELETE', () => {

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

    it('Given the route (DELETE)/api/v1/car/:id when passed the ID then should remove the car', async () => {
        const response = await request(app).delete(`/api/v1/car/${carId}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
    });

    it('Given the route (DELETE)/api/v1/car/:id when passed incorrect ID path then should return an error', async () => {
        const response = await request(app).delete(`/api/v1/car/${carId}14356`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Id pattern does not match');
    });

    it('Given the route (DELETE)/api/v1/car/:id when passed inexistent ID then should return an error', async () => {
        const response = await request(app).delete('/api/v1/car/62698bdfa3a3ce880d0a64f4').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Could not remove, car not found');
    });

});