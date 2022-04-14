import express from 'express';
import AuthenticateController from '../controllers/AuthenticateController';
import sendValidator from '../validators/Authenticate/send';
const router = express.Router();

router.post('/api/v1/authenticate', sendValidator, AuthenticateController.authenticate);

export default router;