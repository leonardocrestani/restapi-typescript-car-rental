import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';

describe('Users GET', () => {

    let token: string;
    let userId: string;

    beforeAll(async () => {
        const user = {
            name: "Leonardo",
            cpf: "199.635.500-70",
            birthDate: "03/03/2002",
            email: "leonardo@email.com",
            password: "123456",
            licensed: "yes"
        }
        const registeredUser = await request(app).post('/api/v1/people').send(user);
        const response = await request(app).post('/api/v1/authenticate').send({ email: "leonardo@email.com", password: "123456" });
        token = response.body.token;
        userId = registeredUser.body.people._id
    });

    afterAll(async () => {
        await People.deleteMany();
        mongoose.connection.close();
    });

    it('Given the route (GET)/api/v1/people?limit=&offset when passed the limit and offset then should return all users registered with pagination and total registers', async () => {
        const response = await request(app).get('/api/v1/people?limit=10&offset=1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.peoples.length).toBeGreaterThan(0);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('offset');
        expect(response.body).toHaveProperty('offsets');
    });

    it('Given the route (GET)/api/v1/people?limit=&offset when not passed the limit then should return an error', async () => {
        const response = await request(app).get('/api/v1/people?&offset=1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"limit\" is required');
    });

    it('Given the route (GET)/api/v1/people?limit=&offset when not passed the offset then should return an error', async () => {
        const response = await request(app).get('/api/v1/people?limit=10').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"offset\" is required');
    });

    it('Given the route (GET)/api/v1/people/:id when passed the ID then should return the users registered with correct informations', async () => {
        const response = await request(app).get(`/api/v1/people/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('cpf');
        expect(response.body).toHaveProperty('birthDate');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('licensed');
    });

    it('Given the route (GET)/api/v1/people/:id when passed incorrect ID path then should return an error', async () => {
        const response = await request(app).get(`/api/v1/people/${userId}756756`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Id pattern does not match');
    });

    it('Given the route (GET)/api/v1/people/:id when passed inexistent ID then should return an error', async () => {
        const response = await request(app).get('/api/v1/people/62698bdfa3a3ce880d0a64f4').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Informed people not found');
    });

});