import express from 'express';
import authenticateRoute from './authenticateRoute';
import peopleRegisterRoute from './peopleRegisterRoute';
import peopleRoute from './peopleRoute';
import carRoute from './carRoute';

export default (app: any) => {
    app.use(express.json());
    app.use(authenticateRoute);
    app.use(peopleRegisterRoute)
    app.use(peopleRoute);
    app.use(carRoute);
}