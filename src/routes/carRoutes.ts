import express from 'express';
import CarController from '../controllers/CarController';
const router = express.Router();

router.get('/cars', CarController.find);

export default router;