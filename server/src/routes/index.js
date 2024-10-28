import { Router } from 'express';
const router = Router();
import { authenticateToken } from '../middleware/authMiddleware';

import userRoutes from './userRoutes';
import eventRoutes from './eventRoutes';

router.use('/users', userRoutes);
router.use('/events', authenticateToken, eventRoutes);

export default router;