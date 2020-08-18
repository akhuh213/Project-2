'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calorieLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.calorieLog.belongsTo(models.user)
    }
  };
  calorieLog.init({
    Date: DataTypes.STRING,
    food: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    totalCalories: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'calorieLog',
  });
  return calorieLog;
};