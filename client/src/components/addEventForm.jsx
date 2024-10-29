import React, { useState } from 'react';

const AddEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !startDate || !endDate) {
      alert('Please fill out all required fields');
      return;
    }

    const newEvent = {
      title,
      description,
      startDate,
      endDate,
      location,
    };

    try {
      const response = await fetch('../../../server/src/models/event.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setStatusMessage(`Event added successfully! ID: ${result.id}`);

      // Clear the form fields after successful submission
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setLocation('');
    } catch (error) {
      console.error('Error adding event:', error);
      setStatusMessage('Failed to add event. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <button type="submit">Add Event</button>
      
      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

export default AddEventForm;