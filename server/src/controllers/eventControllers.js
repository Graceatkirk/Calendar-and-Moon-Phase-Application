import { Event } from '../models/event.js';
import { createEvent, getUserEvents } from '../services/EventService.js';


class EventController {
  async getUserEvents(req, res) {
    try {
      const { userId } = req.user; // Assuming you have user info from authentication middleware
      const { startDate, endDate } = req.query;

      // Call your service or model directly to retrieve events
      const events = await Event.findAll({ 
        where: { userId }, 
        ...(startDate && endDate ? { 
          start_time: { 
            [Op.gte]: new Date(startDate), 
          }, 
          end_time: { 
            [Op.lte]: new Date(endDate) 
          } 
        } : {}) 
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving events', error });
    }
  }

  async createEvent(req, res) {
    try {
      const { userId } = req.user; // Get the user ID from the authenticated user
      const newEvent = await Event.create({ 
        ...req.body, 
        userId 
      });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: 'Error adding event', error });
    }
  }

  async updateEvent(req, res) {
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

  async deleteEvent(req, res) {
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
}

export default new EventController();