const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const DashboardConfig = sequelize.define('DashboardConfig', {
  name: { type: DataTypes.STRING, allowNull: false },
  dateFilter: { type: DataTypes.STRING, defaultValue: 'All time' },
  layout: { type: DataTypes.JSON },
  widgets: { type: DataTypes.JSON }
});

module.exports = DashboardConfig;