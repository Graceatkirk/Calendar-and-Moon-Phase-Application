// server/src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import axios from 'axios';
import bodyParser from 'body-parser';

// Import routes using ES modules syntax
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import router from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Route setup
app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', router);

// Database configuration
const pool = new Pool({
    user: process.env.DB_USER || 'your_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'calendar',
    password: process.env.DB_PASSWORD || 'your_password',
    port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client:', err.stack);
    }
    console.log('Database connected successfully');
    release();
});

// Function to fetch holidays from Calendarific API
const fetchHolidays = async () => {
    try {
        const apiKey = process.env.CALENDARIFIC_API_KEY;
        if (!apiKey) {
            throw new Error('Calendarific API key not found in environment variables');
        }

        const year = new Date().getFullYear();
        const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=US&year=${year}`;
        
        const response = await axios.get(url);
        
        if (!response.data?.response?.holidays) {
            throw new Error('Invalid response format from Calendarific API');
        }
        
        return response.data.response.holidays;
    } catch (error) {
        console.error('Error fetching holidays:', error.message);
        throw error;
    }
};

// Function to insert holidays into the database
const insertHolidays = async (holidays) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Clear existing holidays for the current year
        const year = new Date().getFullYear();
        await client.query('DELETE FROM holidays WHERE EXTRACT(YEAR FROM holiday_date) = $1', [year]);
        
        // Insert new holidays
        for (const holiday of holidays) {
            const { name, description, date } = holiday;
            const formattedDate = new Date(date.iso).toISOString();
            
            await client.query(
                'INSERT INTO holidays (holiday_name, holiday_description, holiday_date) VALUES ($1, $2, $3)',
                [name, description, formattedDate]
            );
        }
        
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Function to fetch moon phases
const fetchMoonPhases = async () => {
    try {
        const apiKey = process.env.RAPID_API_KEY;
        if (!apiKey) {
            throw new Error('RapidAPI key not found in environment variables');
        }

        const options = {
            method: 'GET',
            url: 'https://moon-phase.p.rapidapi.com/advanced',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error fetching moon phases:', error.message);
        throw error;
    }
};

// Function to insert moon phases into the database
const insertMoonPhases = async (moonPhases) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Clear existing moon phases for the current date
        const currentDate = new Date().toISOString().split('T')[0];
        await client.query('DELETE FROM moon_phases WHERE DATE(phase_date) = $1', [currentDate]);
        
        // Insert new moon phase data
        const { phase, illumination, age } = moonPhases;
        await client.query(
            'INSERT INTO moon_phases (phase_name, illumination, moon_age, phase_date) VALUES ($1, $2, $3, $4)',
            [phase, illumination, age, currentDate]
        );
        
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Main function to seed the database
const seedDatabase = async () => {
    try {
        console.log('Starting database seeding...');
        
        // Fetch and insert holidays
        console.log('Fetching holidays...');
        const holidays = await fetchHolidays();
        console.log(`Retrieved ${holidays.length} holidays`);
        await insertHolidays(holidays);
        console.log('Holidays inserted successfully');
        
        // Fetch and insert moon phases
        console.log('Fetching moon phases...');
        const moonPhases = await fetchMoonPhases();
        console.log('Retrieved moon phase data');
        await insertMoonPhases(moonPhases);
        console.log('Moon phases inserted successfully');
        
        console.log('Database seeding completed successfully');
    } catch (error) {
        console.error('Error during database seeding:', error);
        throw error;
    }
};

// Start server and seed database
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await seedDatabase();
        console.log('Initial database seeding completed');
    } catch (error) {
        console.error('Initial database seeding failed:', error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


export default app;
    


