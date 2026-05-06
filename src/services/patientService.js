import Patient from '../models/Patient.js';

export const createPatient = async (patientData) => {
  return await Patient.create(patientData);
};

export const getPatients = async () => {
  return await Patient.find({}).sort({ createdAt: -1 });
};

export const getPatientById = async (id) => {
  const patient = await Patient.findById(id);

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};

export const updatePatient = async (id, updateData) => {
  const patient = await Patient.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};