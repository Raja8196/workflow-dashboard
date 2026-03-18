const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const CustomerOrder = sequelize.define('CustomerOrder', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  streetAddress: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING },
  postalCode: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  product: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  unitPrice: { type: DataTypes.FLOAT },
  totalAmount: { type: DataTypes.FLOAT },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' },
  createdBy: { type: DataTypes.STRING }
}, {
  hooks: {
    beforeCreate: (order) => {
      if (order.quantity && order.unitPrice) {
        order.totalAmount = order.quantity * order.unitPrice;
      }
    },
    beforeUpdate: (order) => {
      if (order.quantity && order.unitPrice) {
        order.totalAmount = order.quantity * order.unitPrice;
      }
    }
  }
});

module.exports = CustomerOrder;