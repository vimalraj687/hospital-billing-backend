import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
} from '../services/patientService.js';

// ✅ Controller names अलग रखो
export const createPatientController = async (req, res, next) => {
  try {
    const patient = await createPatient(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getPatientsController = async (req, res, next) => {
  try {
    const patients = await getPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getPatientByIdController = async (req, res, next) => {
  try {
    const patient = await getPatientById(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

export const updatePatientController = async (req, res, next) => {
  try {
    const patient = await updatePatient(req.params.id, req.body);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400);
    next(error);
  }
};