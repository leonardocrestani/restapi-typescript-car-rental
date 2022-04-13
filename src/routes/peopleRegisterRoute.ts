import express from 'express';
import PeopleController from '../controllers/PeopleController';
import registerValidator from '../validators/People/register';
const router = express.Router();

router.post('/api/v1/people', registerValidator, PeopleController.register);

export default router;