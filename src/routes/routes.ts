import express from 'express';
import carRoutes from './carRoutes';

export default (app: any) => {
    app.use(express.json());
    app.use(carRoutes);
}