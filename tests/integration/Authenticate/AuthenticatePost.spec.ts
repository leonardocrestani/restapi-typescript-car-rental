import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';

describe('Authenticate', () => {

    let email: string;
    let password: string;

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
        email = user.email;
        password = user.password;
    });

    afterAll(async () => {
        await People.deleteMany();
        mongoose.connection.close();
    });

    it('Given the route (POST)/api/v1/authenticate when passed the body with user email and password then should return authentication token and licensed ', async () => {
        const response = await request(app).post('/api/v1/authenticate').send({ email, password });
        //console.log(response);
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(email);
        expect(response.body).toHaveProperty('licensed');
        expect(response.body).toHaveProperty('token');
    });

    it('Given the route (POST)/api/v1/authenticate when passed incorrect user email then should return an error ', async () => {
        const response = await request(app).post('/api/v1/authenticate').send({ email: 'teste@teste.com', password });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Could not authenticate, user not found');
    });

    it('Given the route (POST)/api/v1/authenticate when passed incorrect password email then should return an error ', async () => {
        const response = await request(app).post('/api/v1/authenticate').send({ email, password: '134723645' });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Invalid password');
    });

});