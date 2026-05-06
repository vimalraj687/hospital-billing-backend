import express from 'express';
const router = express.Router();

import {
  createBillController,
  getBillsController,
  getBillByIdController,
  getBillsByPatientController,
  updatePaymentController,
} from '../controllers/billController.js';

import { protect } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, createBillController)
  .get(protect, getBillsController);

router
  .route('/patient/:patientId')
  .get(protect, getBillsByPatientController);

router
  .route('/:id')
  .get(protect, getBillByIdController);

router
  .route('/:id/payment')
  .put(protect, updatePaymentController);

export default router;