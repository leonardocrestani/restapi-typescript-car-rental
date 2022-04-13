import express from 'express';
import AuthenticateController from '../controllers/AuthenticateController';
const router = express.Router();

router.post('/api/v1/authenticate', AuthenticateController.authenticate);

export default router;