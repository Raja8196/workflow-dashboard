const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Rule = sequelize.define('Rule', {
  stepId: { type: DataTypes.INTEGER, allowNull: false },
  condition: { type: DataTypes.JSON }, // e.g. { field: 'totalAmount', operator: '<', value: 100 }
  nextStepId: { type: DataTypes.INTEGER },
  priority: { type: DataTypes.INTEGER, defaultValue: 0 },
  isDefault: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Rule;