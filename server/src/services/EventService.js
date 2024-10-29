import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/database.js'; // Adjust the path as needed
import { Event } from '../models/event.js'; // Adjust based on your actual model file paths
import Category from '../models/category.js'; // Adjust as needed
import { Op } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize(dbConfig.development);

export const createEvent = async (eventData, userId, categoryIds) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Event.create({
      user_id: userId,
      title: eventData.title,
      description: eventData.description,
      start_time: eventData.startTime,
      end_time: eventData.endTime,
      location: eventData.location
    }, { transaction });

    if (categoryIds?.length) {
      await event.setCategories(categoryIds, { transaction });
    }

    if (eventData.reminderTime) {
      await Reminder.create({
        event_id: event.id,
        remind_at: eventData.reminderTime
      }, { transaction });
    }

    await transaction.commit();
    return event;
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error creating event: ${error.message}`);
  }
};

export const getUserEvents = async (userId, startDate, endDate) => {
  try {
    return await Event.findAll({
      where: {
        user_id: userId,
        start_time: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [
        {
          model: Category,
          through: { attributes: [] }
        },
        {
          model: Reminder,
          required: false
        }
      ],
      order: [['start_time', 'ASC']]
    });
  } catch (error) {
    throw new Error(`Error fetching user events: ${error.message}`);
  }
};