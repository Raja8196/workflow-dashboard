const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Workflow = sequelize.define('Workflow', {
  name: { type: DataTypes.STRING, allowNull: false },
  version: { type: DataTypes.INTEGER, defaultValue: 1 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  inputSchema: { type: DataTypes.JSON },
  startStepId: { type: DataTypes.INTEGER }
});

module.exports = Workflow;