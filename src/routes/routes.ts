import express from 'express';
import carRoutes from './carRoutes';
import peopleRoutes from './peopleRoutes';

export default (app: any) => {
    app.use(express.json());
    app.use(carRoutes);
    app.use(peopleRoutes);
}