const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Step = sequelize.define('Step', {
  workflowId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, // 'Approval', 'Task', etc.
  order: { type: DataTypes.INTEGER }
});

module.exports = Step;