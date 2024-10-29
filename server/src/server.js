// server/src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';
const authRoutes = require('./routes/authRoutes');
import router from './routes'; // Adjust path as necessary
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import axios from 'axios';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);  
app.use(bodyParser.json());
app.use('/api', router); // This will prefix all routes with /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const pool = new Pool({
    user: 'your_user',
    host: 'localhost',
    database: 'calendar',
    password: 'your_password',
    port: 5432,
});

// Function to fetch holidays from Calendarific API
const fetchHolidays = async () => {
    const apiKey = process.env.CALENDARIFIC_API_KEY;
    const year = new Date().getFullYear();
    const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=US&year=${year}`;
    
    const response = await axios.get(url);
    return response.data.response.holidays;
};

// Function to insert holidays into the database
const insertHolidays = async (holidays) => {
    for (const holiday of holidays) {
        const { name, date } = holiday; // Adjust based on API response structure
        await pool.query('INSERT INTO holidays (holiday_name, holiday_date) VALUES ($1, $2)', [name, date]);
    }
};

// Function to fetch moon phases
const fetchMoonPhases = async () => {
    const apiKey = process.env.MOON_PHASE_API_KEY;
    const url = `https://moon-phase1.p.rapidapi.com/moonphases?date=2024-01-01`;
    
    const response = await axios.get(url, {
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "moon-phase1.p.rapidapi.com"
        }
    });
    return response.data; // Adjust based on API response structure
};

// Function to insert moon phases into the database
const insertMoonPhases = async (moonPhases) => {
    for (const phase of moonPhases) {
        const { name, date } = phase; // Adjust based on API response structure
        await pool.query('INSERT INTO moon_phases (phase_name, phase_date) VALUES ($1, $2)', [name, date]);
    }
};

// Main function to seed the database
const seedDatabase = async () => {
    const holidays = await fetchHolidays();
    await insertHolidays(holidays);
    
    const moonPhases = await fetchMoonPhases();
    await insertMoonPhases(moonPhases);
};

// Call the seed function
seedDatabase()
    .then(() => {
        console.log("Database seeded successfully.");
        pool.end();
    })
    .catch(err => {
        console.error("Error seeding database:", err);
        pool.end();
    });