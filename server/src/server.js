import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import pkg from 'pg';
const { Pool } = pkg;
import { Event } from './models/event.js'; // Adjust as necessary

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);  

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'calendar',
    password: 'postgres',
    port: 5432,
});

// Function to fetch holidays from Calendarific API
const fetchHolidays = async () => {
    const apiKey = process.env.REACT_APP_CALENDARIFIC_API_KEY;
    const year = new Date().getFullYear();
    const url = `https://calendarific.com/api/v2/holidays?api_key=aQZGn0v589N9AT68YoL7RaduBoyiUAG9&country=US&year=2024`;
    
    try {
        const response = await fetch(url);
        return await response.json(); // Properly return JSON response
    } catch (error) {
        console.error("Error fetching from Calendarific API:", error.message);
        return []; // Return an empty array on error
    }
};

// Function to insert holidays into the database
const insertHolidays = async (holidays) => {
    // Ensure that holidays is an array before iterating
    if (!Array.isArray(holidays)) {
        console.error("Expected holidays to be an array but got:", holidays);
        return; // Exit early if not iterable
    }
    
    for (const holiday of holidays) {
        const { name, date } = holiday; // Adjust based on API response structure
        await pool.query('INSERT INTO holidays (holiday_name, holiday_date) VALUES ($1, $2)', [name, date]);
    }
};

// Function to fetch moon phases
const fetchMoonPhases = async () => {
    const apiKey = process.env.REACT_APP_MOON_PHASE_API_KEY;
    const url = `https://moon-phase1.p.rapidapi.com/moonphases?api_key=65d826f7dcmshf7e904b9b97cfb8p11e22bjsn1d3cf87945cedate=2024-01-01`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "moon-phase1.p.rapidapi.com"
            }
        });
        return await response.json(); // Properly return JSON response
    } catch (error) {
        console.error("Error fetching from Moon Phase API:", error.message);
        return []; // Return an empty array on error
    }
};

// Function to insert moon phases into the database
const insertMoonPhases = async (moonPhases) => {
    if (!Array.isArray(moonPhases)) {
        console.error("Expected moonPhases to be an array but got:", moonPhases);
        return; // Exit early if not iterable
    }
    
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

// Route to create a new event
app.post('/api/events', async (req, res) => {
    const { title, description, startDate, endDate, location, userId } = req.body; // Include userId if applicable
      
    // Basic validation
    if (!title || !startDate || !endDate) {
        return res.status(400).json({ message: 'Title, start date, and end date are required.' });
    }
  
    try {
        // Create a new event in the database
        const newEvent = await Event.create({
            user_id: userId, // Assuming userId is provided in the request body
            title,
            description,
            start_time: startDate,  // Make sure the field names match your model
            end_time: endDate,
            location
        });
  
        // Respond with the newly created event data
        return res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ message: 'Failed to create event. Please try again.' });
    }
});
  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
