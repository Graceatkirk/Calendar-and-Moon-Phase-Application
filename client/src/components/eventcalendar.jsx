import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Calendar component CSS
import { fetchHolidays } from './services/calendarificService';
import { fetchMoonPhase } from './services/moonPhaseService';

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [moonPhase, setMoonPhase] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const holidaysData = await fetchHolidays('US', date.getFullYear());
        setHolidays(holidaysData);
        
        const moonPhaseData = await fetchMoonPhase(date.toISOString().split('T')[0]);
        setMoonPhase(moonPhaseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [date]);

  const tileContent = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    const holidaysOnDate = holidays.filter(holiday => holiday.date.iso === dateString);
    return holidaysOnDate.length > 0 ? <span className="event-marker">🎉</span> : null;
  };

  return (
    <div className="calendar-container">
      <h2>Event Calendar</h2>
      <Calendar onChange={setDate} value={date} tileContent={tileContent} />

      <div>
        <h3>Selected Date: {date.toDateString()}</h3>
        {moonPhase && (
          <p>Moon Phase: {moonPhase.phase}</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
