import express from 'express';
import CarController from '../controllers/CarController';
import findValidator from '../validators/Car/find';
const router = express.Router();

router.get('/cars', findValidator, CarController.find);

export default router;