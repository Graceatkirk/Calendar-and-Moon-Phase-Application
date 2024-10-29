// server/src/routes/eventRoutes.js
import express from 'express';
import EventController from '../controllers/eventController';
import authenticate from '../middleware/authMiddleware';  // Optional: for user authentication

const router = express.Router();

router.get('/events', authenticate, EventController.getUserEvents);
router.post('/events', authenticate, EventController.createEvent);
router.put('/events/:id', authenticate, EventController.updateEvent);
router.delete('/events/:id', authenticate, EventController.deleteEvent);

export default router;