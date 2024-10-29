import express from 'express';
import { register, login } from '../controllers/authControllers.js'; // Ensure correct path and .js extension
import envService from '../services/envService.js';

const router = express.Router();

// Define the routes for user registration and login

router.post('/register', register);
router.post('/login', login);

// Export the router as the default export
export default router;
