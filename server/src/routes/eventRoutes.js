// src/routes/eventRoutes.js

import express from 'express';
import EventController from '../controllers/eventControllers.js'; // Make sure the path is correct
import authenticate from '../middleware/auth.js'; // Optional: for user authentication

const router = express.Router();

// Get user events
router.get('/events', authenticate, EventController.getUserEvents);

// Create a new event
router.post('/events', authenticate, EventController.createEvent);

// Update an existing event
router.put('/events/:id', authenticate, EventController.updateEvent);

// Delete an event
router.delete('/events/:id', authenticate, EventController.deleteEvent);

export default router;