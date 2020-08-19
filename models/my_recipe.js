'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class my_recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.my_recipe.belongsTo(models.user)
    }
  };
  my_recipe.init({
    name: DataTypes.STRING,
    ingredient: DataTypes.STRING(1234),
    recipeUrl: DataTypes.STRING,
    diet: DataTypes.STRING,
    cal: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'my_recipe',
  });
  return my_recipe;
};