import express from 'express';
import PeopleController from '../controllers/PeopleController';
import findValidator from '../validators/People/find';
import registerValidator from '../validators/People/register';
import updateParamsValidator from '../validators/People/updateParams';
import updateBodyValidator from '../validators/People/updateBody';
import deleteValidator from '../validators/People/delete';
const router = express.Router();

router.get('/api/v1/people', findValidator, PeopleController.find);
router.get('/api/v1/people/:id', PeopleController.findById);
router.post('/api/v1/people', registerValidator, PeopleController.register);
router.put('/api/v1/people/:id', updateParamsValidator, updateBodyValidator, PeopleController.update);
router.delete('/api/v1/people/:id', deleteValidator, PeopleController.remove);

export default router;