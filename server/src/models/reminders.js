const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
  
  return Reminder;
};
