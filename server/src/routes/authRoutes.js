import express from 'express';
import { register, login } from '../controllers/authControllers.js'; // Ensure correct path and .js extension

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Export the router as the default export
export default router;