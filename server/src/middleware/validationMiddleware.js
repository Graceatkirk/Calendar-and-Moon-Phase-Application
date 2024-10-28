// server/src/middleware/validationMiddleware.js
import { body, param, query, validationResult } from 'express-validator';

// Validation middleware
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Event validation rules
export const eventValidationRules = {
    create: [
        body('title').trim().notEmpty().withMessage('Event title is required'),
        body('start_date').isISO8601().withMessage('Valid start date is required'),
        body('end_date').isISO8601().withMessage('Valid end date is required')
            .custom((value, { req }) => {
                if (new Date(value) < new Date(req.body.start_date)) {
                    throw new Error('End date must be after start date');
                }
                return true;
            }),
        body('description').optional().trim(),
        body('color').optional().isHexColor().withMessage('Valid color hex code is required'),
        body('is_recurring').optional().isBoolean(),
        body('recurrence_pattern').optional().isIn(['daily', 'weekly', 'monthly', 'yearly'])
    ],
    update: [
        param('id').isInt().withMessage('Valid event ID is required'),
        body('title').optional().trim().notEmpty(),
        body('start_date').optional().isISO8601(),
        body('end_date').optional().isISO8601()
            .custom((value, { req }) => {
                if (req.body.start_date && new Date(value) < new Date(req.body.start_date)) {
                    throw new Error('End date must be after start date');
                }
                return true;
            }),
        body('description').optional().trim(),
        body('color').optional().isHexColor(),
        body('is_recurring').optional().isBoolean(),
        body('recurrence_pattern').optional().isIn(['daily', 'weekly', 'monthly', 'yearly'])
    ],
    delete: [
        param('id').isInt().withMessage('Valid event ID is required')
    ],
    get: [
        query('start_date').optional().isISO8601(),
        query('end_date').optional().isISO8601(),
        query('user_id').optional().isInt()
    ]
};

// User validation rules
export const userValidationRules = {
    register: [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/\d/).withMessage('Password must contain a number')
            .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
            .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
            .matches(/[!@#$%^&*]/).withMessage('Password must contain a special character'),
        body('name').trim().notEmpty().withMessage('Name is required')
    ],
    login: [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ]
};