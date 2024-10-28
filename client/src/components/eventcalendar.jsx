// src/components/EventCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the default styles

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const EventCalendar = () => {
    const [events, setEvents] = useState([]);

    // Fetch events from your API (or directly from your state if already available)
    useEffect(() => {
        // You can fetch events from your backend API here
        // For now, we'll use some static data
        const fetchedEvents = [
            {
                id: 0,
                title: 'New Year\'s Day',
                start: new Date(2024, 0, 1), // January 1, 2024
                end: new Date(2024, 0, 1, 23, 59, 59),
            },
            {
                id: 1,
                title: 'Doctor Appointment',
                start: new Date(2024, 0, 10, 15, 0), // January 10, 2024, 3 PM
                end: new Date(2024, 0, 10, 16, 0), // January 10, 2024, 4 PM
            },
            // Add more events as needed
        ];
        setEvents(fetchedEvents);
    }, []);

    return (
        <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '50px' }}
            />
        </div>
    );
};

const apiUrl = 'https://calendarific.com/'; // Replace with your actual API URL
const outputElement = document.getElementById('output'); // Adjust the ID as needed

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        outputElement.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error fetching holidays:', error);
    });
// Adjust the URL as needed

export default EventCalendar;
