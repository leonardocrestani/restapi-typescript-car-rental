import express from 'express';
import CarController from '../controllers/CarController';
import findValidator from '../validators/Car/find';
import registerValidator from '../validators/Car/register';
import updateParamsValidator from '../validators/Car/updateParams';
import updateBodyValidator from '../validators/Car/updateBody';
import deleteValidator from '../validators/Car/delete';
const router = express.Router();

router.get('/api/v1/car', findValidator, CarController.find);
router.get('/api/v1/car/:id', CarController.findById);
router.post('/api/v1/car', registerValidator, CarController.register);
router.put('/api/v1/car/:id', updateParamsValidator, updateBodyValidator, CarController.update);
router.delete('/api/v1/car/:id', deleteValidator, CarController.remove);

export default router;