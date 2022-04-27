import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';

describe('Users POST', () => {

    beforeEach(async () => {
        await People.deleteMany();
    });

    afterAll(async () => {
        await People.deleteMany();
        mongoose.connection.close();
    });

    it('Given the route (POST)/api/v1/people when the personal informations is passed then should registrate a new user and return authetication token', async () => {
        const user = {
            name: "Leonardo",
            cpf: "199.635.500-70",
            birthDate: "03/03/2002",
            email: "leonardof@email.com",
            password: "123456",
            licensed: "yes"
        }
        const response = await request(app).post('/api/v1/people').send(user);
        expect(response.status).toBe(201);
        expect(response.body.people.name).toBe('Leonardo');
        expect(response.body).toHaveProperty('token');
    });

    it('Given the route (POST)/api/v1/people when try to registrate a new user with invalid CPF then should return an error', async () => {
        const user = {
            name: "Leonardo",
            cpf: "199.635.500-705463",
            birthDate: "03/03/2002",
            email: "leonardof@email.com",
            password: "123456",
            licensed: "yes"
        }
        const response = await request(app).post('/api/v1/people').send(user);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Invalid CPF');
    });

    it('Given the route (POST)/api/v1/people when try to registrate a new user with invalid password then should return an error', async () => {
        const user = {
            name: "Leonardo",
            cpf: "199.635.500-70",
            birthDate: "03/03/2002",
            email: "leonardof@email.com",
            password: "123abc",
            licensed: "yes"
        }
        const response = await request(app).post('/api/v1/people').send(user);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Password must have only numbers');
    });

    it('Given the route (POST)/api/v1/people when try to registrate a new user with invalid email then should return an error', async () => {
        const user = {
            name: "Leonardo",
            cpf: "199.635.500-70",
            birthDate: "03/03/2002",
            email: "leonardoemailcom",
            password: "1234567",
            licensed: "yes"
        }
        const response = await request(app).post('/api/v1/people').send(user);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"email\" must be a valid email');
    });

    it('Given the route (POST)/api/v1/people when try to registrate a new user with licensed without being "yes" or "no" then should return an error', async () => {
        const user = {
            name: "Leonardo",
            cpf: "199.635.500-70",
            birthDate: "03/03/2002",
            email: "leonardo@email.com",
            password: "1234567",
            licensed: "testeteste"
        }
        const response = await request(app).post('/api/v1/people').send(user);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"licensed\" must be one of [yes, no]');
    });

});