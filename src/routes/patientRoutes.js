import express from 'express';
const router = express.Router();

import {
  createPatientController,
  getPatientsController,
  getPatientByIdController,
  updatePatientController,
} from '../controllers/patientController.js';

import { protect } from '../middleware/authMiddleware.js';
import { validatePatient } from '../middleware/validationMiddleware.js';

router
  .route('/')
  .post(protect, validatePatient, createPatientController)
  .get(protect, getPatientsController);

router
  .route('/:id')
  .get(protect, getPatientByIdController)
  .put(protect, validatePatient, updatePatientController);

export default router;