'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Attendance, {foreignKey: 'eventId'})
      Event.hasMany(models.EventImage, {foreignKey: 'eventId'})
      Event.belongsTo(models.Venue, {foreignKey: 'venueId'})
      Event.belongsToMany(models.User, {through: models.Attendance, foreignKey: 'eventId', otherKey: 'userId'})

    }
  }
  Event.init({
    venueId: {type: DataTypes.INTEGER},
    groupId: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    type: {type: DataTypes.ENUM(['In person', 'Online']), allowNull: false},
    capacity: {type: DataTypes.INTEGER},
    price: {type: DataTypes.INTEGER},
    startDate: {type: DataTypes.DATE, allowNull: false},
    endDate: {type: DataTypes.DATE, allowNull: false}
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
