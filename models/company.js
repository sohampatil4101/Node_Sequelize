'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
    }
  }
  Company.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Define id as the primary key
      autoIncrement: true // Assuming id is auto-incrementing
    },
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    website: DataTypes.STRING,
    email: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};
