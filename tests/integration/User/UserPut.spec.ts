import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';
import People from '../../../src/schemas/People';

describe('Users PUT', () => {

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

    it('Given the route (PUT)/api/v1/people/:id when passed the ID and a body with new informations then should update the user', async () => {
        const newBody = {
            name: "Pedro",
            email: "pedro@example.com",
            licensed: "no"
        }
        const response = await request(app).put(`/api/v1/people/${userId}`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId);
        expect(response.body.name).toBe('Pedro');
        expect(response.body.email).toBe('pedro@example.com');
        expect(response.body.licensed).toBe('no');
    });

    it('Given the route (PUT)/api/v1/people/:id when passed ID and not passed a body or passed and empty body then should return an error', async () => {
        const response = await request(app).put(`/api/v1/people/${userId}756756`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"value\" must have at least 1 key');
    });

    it('Given the route (PUT)/api/v1/people/:id when passed incorrect ID path then should return an error', async () => {
        const newBody = {
            name: "Pedro",
            email: "pedro@example.com",
            licensed: "no"
        }
        const response = await request(app).put(`/api/v1/people/${userId}756756`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Id pattern does not match');
    });

    it('Given the route (PUT)/api/v1/people/:id when passed inexistent ID then should return an error', async () => {
        const newBody = {
            name: "Pedro",
            email: "pedro@example.com",
            licensed: "no"
        }
        const response = await request(app).put('/api/v1/people/62698bdfa3a3ce880d0a64f4').set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Could not update people, people not found');
    });

    it('Given the route (PUT)/api/v1/people/:id when try to update a user with invalid CPF then should return an error', async () => {
        const newBody = {
            name: "Pedro",
            cpf: "199.635.500-705463",
            email: "pedro@example.com",
            licensed: "no"
        }
        const response = await request(app).put(`/api/v1/people/${userId}`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Invalid CPF');
    });

    it('Given the route (PUT)/api/v1/people/:id when try to update a user with invalid password then should return an error', async () => {
        const newBody = {
            name: "Pedro",
            cpf: "199.635.500-70",
            password: "123abc",
            email: "pedro@example.com",
            licensed: "no"
        }
        const response = await request(app).put(`/api/v1/people/${userId}`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Password must have only numbers');
    });

    it('Given the route (PUT)/api/v1/people:id when try to update a user with invalid email then should return an error', async () => {
        const newBody = {
            name: "Pedro",
            cpf: "199.635.500-70",
            password: "123abc",
            email: "pedroexamplecom",
            licensed: "no"
        }
        const response = await request(app).put(`/api/v1/people/${userId}`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"email\" must be a valid email');
    });

    it('Given the route (PUT)/api/v1/people/:id when try to update a user with licensed without being "yes" or "no" then should return an error', async () => {
        const newBody = {
            name: "Pedro",
            cpf: "199.635.500-70",
            password: "123456",
            email: "pedro@example.com",
            licensed: "abc"
        }
        const response = await request(app).put(`/api/v1/people/${userId}`).set('Authorization', `Bearer ${token}`).send(newBody);
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('\"licensed\" must be one of [yes, no]');
    });

});