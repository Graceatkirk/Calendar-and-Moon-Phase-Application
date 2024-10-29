import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import pkg from 'pg';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

const { Pool } = pkg;
import { Event } from './models/event.js'; // Adjust as necessary

dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if necessary
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);  

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'calendar',
    password: 'howdypartner',
    port: 5432,
});

// Authentication function
const authenticateUser = async (email, password) => {
    // Replace this with your actual user authentication logic
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // Here you should validate the password with a proper hash comparison
    // For example:
    // const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (user) {
        return user; // Return user details if authentication is successful
    }
    return null; // Return null if authentication fails
};

// JWT generation function
const generateJWT = (user) => {
    const payload = { id: user.id, email: user.email }; // Include relevant user info
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate token
};

// Route to handle login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateJWT(user);
    res.json({ token }); // Respond with the token
});

// Other functions remain unchanged...
// Your existing fetchHolidays, insertHolidays, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
