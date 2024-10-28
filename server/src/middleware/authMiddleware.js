import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Verify JWT token
export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access token is required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user exists and token is not blacklisted
        const result = await pool.query(
            'SELECT users.*, blacklisted_tokens.token_id FROM users LEFT JOIN blacklisted_tokens ON users.id = blacklisted_tokens.user_id AND blacklisted_tokens.token = $1 WHERE users.id = $2',
            [token, decoded.userId]
        );

        if (!result.rows[0] || result.rows[0].token_id) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        }
        next(error);
    }
};

// Check user role
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        next();
    };
};

// Rate limiting middleware
export const rateLimiter = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
};