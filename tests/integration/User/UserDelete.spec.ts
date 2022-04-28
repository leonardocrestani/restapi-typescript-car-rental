import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';

describe('Users DELETE', () => {

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

    it('Given the route (DELETE)/api/v1/people/:id when passed the ID then should remove the user', async () => {
        const response = await request(app).delete(`/api/v1/people/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
    });

    it('Given the route (DELETE)/api/v1/people/:id when passed incorrect ID path then should return an error', async () => {
        const response = await request(app).delete(`/api/v1/people/${userId}14356`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Id pattern does not match');
    });

    it('Given the route (DELETE)/api/v1/people/:id when passed inexistent ID then should return an error', async () => {
        const response = await request(app).delete('/api/v1/people/62698bdfa3a3ce880d0a64f4').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Could not remove, client not found');
    });

});