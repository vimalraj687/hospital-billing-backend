import { authUser, registerUser } from '../services/authService.js';

 
export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userData = await registerUser(
      name,
      email,
      password,
      role
    );

    res.status(201).json(userData);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const authUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = await authUser(email, password);

    res.status(200).json(userData);
  } catch (error) {
    res.status(401);
    next(error);
  }
};