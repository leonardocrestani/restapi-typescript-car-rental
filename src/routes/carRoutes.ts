import express from 'express';
import CarController from '../controllers/CarController';
import findValidator from '../validators/Car/find';
import registerValidator from '../validators/Car/register';
import deleteValidator from '../validators/Car/delete';
const router = express.Router();

router.get('/cars', findValidator, CarController.find);
router.post('/cars', registerValidator, CarController.register);
router.delete('/cars/:id', deleteValidator, CarController.remove);

export default router;