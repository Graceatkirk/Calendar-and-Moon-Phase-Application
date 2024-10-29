
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get('http://localhost:5432/api/holidays');
        setHolidays(response.data.response.holidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div>
      <h1>Holidays</h1>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.name}>{holiday.name} - {holiday.date.iso}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;

