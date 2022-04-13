import express from 'express';
import PeopleController from '../controllers/PeopleController';
import authMiddleware from '../middlewares/authMiddleware';
import findValidator from '../validators/People/find';
import updateParamsValidator from '../validators/People/updateParams';
import updateBodyValidator from '../validators/People/updateBody';
import deleteValidator from '../validators/People/delete';
const router = express.Router();

router.use(authMiddleware);
router.get('/api/v1/people', findValidator, PeopleController.find);
router.get('/api/v1/people/:id', PeopleController.findById);
router.put('/api/v1/people/:id', updateParamsValidator, updateBodyValidator, PeopleController.update);
router.delete('/api/v1/people/:id', deleteValidator, PeopleController.remove);

export default router;