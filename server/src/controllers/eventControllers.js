import { Event } from '../models';

export async function getEvents(req, res) {
  try {
    const events = await Event.findAll({ where: { userId: req.user.id } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error });
  }
}

export async function addEvent(req, res) {
  try {
    const newEvent = await Event.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
}

export async function updateEvent(req, res) {
  try {
    const [updated] = await Event.update(req.body, {
      where: { id: req.params.id, userId: req.user.id }
    });
    if (updated) {
      const updatedEvent = await Event.findOne({ where: { id: req.params.id } });
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
}

export async function deleteEvent(req, res) {
  try {
    const deleted = await Event.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
}


import { createEvent as _createEvent, getUserEvents as _getUserEvents } from '../services/EventServiceventService';

class EventController {
  async createEvent(req, res) {
    try {
      const { userId } = req.user; // Assuming you have authentication middleware
      const event = await _createEvent(req.body, userId, req.body.categoryIds);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserEvents(req, res) {
    try {
      const { userId } = req.user;
      const { startDate, endDate } = req.query;
      const events = await _getUserEvents(userId, startDate, endDate);
      res.json(events);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new EventController();