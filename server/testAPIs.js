// testAPIs.js
import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables

const testCalendarificAPI = async () => {
    const apiKey = process.env.CALENDARIFIC_API_KEY;
    const year = new Date().getFullYear();
    const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=US&year=${year}`;
    

    try {
        const response = await axios.get(url);
        console.log("Calendarific API response:", response.data);
    } catch (error) {
        console.error("Error fetching from Calendarific API:", error.message);
    }
};

const testMoonPhaseAPI = async () => {
    const apiKey = process.env.MOON_PHASE_API_KEY;
    const url = `https://moon-phase1.p.rapidapi.com/moonphases?date=2024-01-01`;

    try {
        const response = await axios.get(url, {
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "moon-phase1.p.rapidapi.com"
            }
        });
        console.log("Moon Phase API response:", response.data);
    } catch (error) {
        console.error("Error fetching from Moon Phase API:", error.message);
    }
};

const testAPIs = async () => {
    await testCalendarificAPI();
    await testMoonPhaseAPI();
};

testAPIs();
