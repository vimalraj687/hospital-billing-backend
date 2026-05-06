import {
  createBill,
  getBills,
  getBillById,
  getBillsByPatientId,
  updatePayment,
} from '../services/billService.js';

export const createBillController = async (req, res, next) => {
  try {
    const bill = await createBill(req.body);
    res.status(201).json(bill);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getBillsController = async (req, res, next) => {
  try {
    const bills = await getBills();
    res.status(200).json(bills);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getBillByIdController = async (req, res, next) => {
  try {
    const bill = await getBillById(req.params.id);
    res.status(200).json(bill);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

export const getBillsByPatientController = async (req, res, next) => {
  try {
    const bills = await getBillsByPatientId(req.params.patientId);
    res.status(200).json(bills);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const updatePaymentController = async (req, res, next) => {
  try {
    const { paidAmount } = req.body;

    const bill = await updatePayment(req.params.id, paidAmount);

    res.status(200).json(bill);
  } catch (error) {
    res.status(400);
    next(error);
  }
};