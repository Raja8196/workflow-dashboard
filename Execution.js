const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Execution = sequelize.define('Execution', {
  workflowId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Running' }, // Running, Completed, Failed
  currentStepId: { type: DataTypes.INTEGER },
  context: { type: DataTypes.JSON }, // Stores workflow variables
  history: { type: DataTypes.JSON } // Logs of steps taken
});

module.exports = Execution;