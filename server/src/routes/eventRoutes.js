

// server/src/routes/eventRoutes.js
import express from 'express';
import { authenticateToken, checkRole } from '../middleware/authMiddleware.js';
import { eventValidationRules, validate } from '../middleware/validationMiddleware.js';
import * as eventController from '../controllers/eventController.js';

const router = express.Router();

router.get('/events', authenticate, eventController.getUserEvents);
router.post('/events', authenticate, eventController.createEvent);
router.put('/events/:id', authenticate, eventController.updateEvent);
router.delete('/events/:id', authenticate, eventController.deleteEvent);


router.post('/events',
    authenticateToken,
    eventValidationRules.create,
    validate,
    eventController.createEvent
);

router.put('/events/:id',
    authenticateToken,
    eventValidationRules.update,
    validate,
    eventController.updateEvent
);

router.delete('/events/:id',
    authenticateToken,
    eventValidationRules.delete,
    validate,
    eventController.deleteEvent
);

router.get('/events',
    authenticateToken,
    eventValidationRules.get,
    validate,
    eventController.getEvents
);

export default router;
