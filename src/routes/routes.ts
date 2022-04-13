import express from 'express';
import authenticateRoute from './authenticateRoute';
import peopleRegisterRoute from './peopleRegisterRoute';
import peopleRoutes from './peopleRoute';
import carRoutes from './carRoute';

export default (app: any) => {
    app.use(express.json());
    app.use(authenticateRoute);
    app.use(peopleRegisterRoute)
    app.use(peopleRoutes);
    app.use(carRoutes);
}