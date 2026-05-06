import Joi from 'joi';

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'receptionist'),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400);
    return next(new Error(error.details[0].message));
  }

  next();
};

export const validatePatient = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string()
      .valid('Male', 'Female', 'Other')
      .required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400);
    return next(new Error(error.details[0].message));
  }

  next();
};