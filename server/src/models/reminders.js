import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Adjust the path if necessary

class Reminder extends Model {
  static associate(models) {
    Reminder.belongsTo(models.Event, {
      foreignKey: 'event_id'
    });
  }
}

Reminder.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'events',
      key: 'id'
    }
  },
  remind_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Reminder',
  tableName: 'reminders',
  timestamps: true,
  underscored: true
});

// Export the model as a named export
export { Reminder };
