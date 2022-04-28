import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';
import Car from '../../../src/schemas/Car';

describe('Car GET', () => {

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

    it('Given the route (GET)/api/v1/car?limit=&offset when passed the limit and offset then should return all car registered with pagination and total registers', async () => {
        const response = await request(app).get('/api/v1/car?limit=10&offset=1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.vehicles.length).toBeGreaterThan(0);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('offset');
        expect(response.body).toHaveProperty('offsets');
    });

    it('Given the route (GET)/api/v1/car?limit=&offset=&model= when passed the limit offset and model then should return all car registered with the model passed, pagination and total registers', async () => {
        const response = await request(app).get('/api/v1/car?limit=10&offset=1&model=GM S10 2.8').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.vehicles.length).toBeGreaterThan(0);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('offset');
        expect(response.body).toHaveProperty('offsets');
    });

    it('Given the route (GET)/api/v1/car?limit=&offset=&color= when passed the limit offset and color then should return all car registered with the color passed, pagination and total registers', async () => {
        const response = await request(app).get('/api/v1/car?limit=10&offset=1&color=branco').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.vehicles.length).toBeGreaterThan(0);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('offset');
        expect(response.body).toHaveProperty('offsets');
    });

    it('Given the route (GET)/api/v1/car?limit=&offset=&year= when passed the limit offset and year then should return all car registered with the year passed, pagination and total registers', async () => {
        const response = await request(app).get('/api/v1/car?limit=10&offset=1&year=2010').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.vehicles.length).toBeGreaterThan(0);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('offset');
        expect(response.body).toHaveProperty('offsets');
    });

    it('Given the route (GET)/api/v1/car?limit=&offset=&description= when passed the limit offset and accessory then should return all car registered with the accessory passed, pagination and total registers', async () => {
        const response = await request(app).get('/api/v1/car?limit=10&offset=1&description=Ar-condicionado').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.vehicles.length).toBeGreaterThan(0);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('offset');
        expect(response.body).toHaveProperty('offsets');
    });

    it('Given the route (GET)/api/v1/car?limit=&offset=&passengers= when passed the limit offset and passengers then should return all car registered with the passengers passed, pagination and total registers', async () => {
        const response = await request(app).get('/api/v1/car?limit=10&offset=1&passengers=5').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.vehicles.length).toBeGreaterThan(0);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('offset');
        expect(response.body).toHaveProperty('offsets');
    });

    it('Given the route (GET)/api/v1/car?limit=&offset when not passed the limit then should return an error', async () => {
        const response = await request(app).get('/api/v1/car?&offset=1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"limit\" is required');
    });

    it('Given the route (GET)/api/v1/car?limit=&offset when not passed the offset then should return an error', async () => {
        const response = await request(app).get('/api/v1/car?limit=10').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"offset\" is required');
    });

    it('Given the route (GET)/api/v1/car/:id when passed the ID then should return the cars registered with correct informations', async () => {
        const response = await request(app).get(`/api/v1/car/${carId}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(carId);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('model');
        expect(response.body).toHaveProperty('color');
        expect(response.body).toHaveProperty('year');
        expect(response.body).toHaveProperty('accessories');
        expect(response.body).toHaveProperty('passengers');
    });

    it('Given the route (GET)/api/v1/car/:id when passed incorrect ID path then should return an error', async () => {
        const response = await request(app).get(`/api/v1/car/${carId}756756`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Id pattern does not match');
    });

    it('Given the route (GET)/api/v1/car/:id when passed inexistent ID then should return an error', async () => {
        const response = await request(app).get('/api/v1/car/62698bdfa3a3ce880d0a64f4').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Informed car not found');
    });

});