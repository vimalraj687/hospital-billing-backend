import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import billRoutes from './routes/billRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/bills', billRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;