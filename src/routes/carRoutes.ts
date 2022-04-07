import express from 'express';
import CarController from '../controllers/CarController';
import findValidator from '../validators/Car/find';
import registerValidator from '../validators/Car/register';
const router = express.Router();

router.get('/cars', findValidator, CarController.find);
router.post('/cars', registerValidator, CarController.register);

export default router;