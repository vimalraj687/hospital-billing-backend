import express from 'express';
const router = express.Router();

import {
  registerUserController,
  authUserController,
} from '../controllers/authController.js';

import { validateRegister } from '../middleware/validationMiddleware.js';

router.post('/register', validateRegister, registerUserController);
router.post('/login', authUserController);

export default router;