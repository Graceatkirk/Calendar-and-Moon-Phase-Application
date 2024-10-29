
import React, { useEffect, useState } from 'react';
import { getMoonPhase } from '../services/moonPhaseService';
import axios from 'axios';

const Calendar = () => {
  const [holidays, setHolidays] = useState([]);
  const [moonPhase, setMoonPhase] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


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

  useEffect(() => { 
    const fetchMoonPhase = async () => { 
      try { 
        const data = await getMoonPhase(); 
        setMoonPhase(data); 
      } catch (err) { 
        setError('Failed to fetch moon phase data'); 
      } finally { 
        setLoading(false); 
      } 
    }; 
    fetchMoonPhase(); 
  }, []); 
  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>;

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

return ( 
  <div> 
    <h2>Moon Phase Calendar</h2> 
    <ul>
      {getMoonPhase.map((phase) => (
        <li key={phase.date}>{phase.date} - {phase.phase}</li>
      ))}
    </ul>
  </div> 
); 

