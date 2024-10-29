import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Ensure this imports the initialized Sequelize instance

class Event extends Model {
  static associate(models) {
    Event.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Event.belongsToMany(models.Category, {
      through: 'event_categories',
      foreignKey: 'event_id'
    });
    Event.hasMany(models.Reminder, {
      foreignKey: 'event_id',
      onDelete: 'CASCADE'
    });
  }
}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: DataTypes.TEXT,
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: DataTypes.STRING(255)
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'events',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at', // Optional, if you want to map custom names
  updatedAt: 'updated_at'  // Optional, if you want to map custom names
});

// Export the model as a named export
export { Event };