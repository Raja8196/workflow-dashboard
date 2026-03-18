const express = require('express');
const router = express.Router();
const CustomerOrder = require('../models/CustomerOrder');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await CustomerOrder.findAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create an order
router.post('/', async (req, res) => {
  try {
    const order = await CustomerOrder.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating order' });
  }
});

module.exports = router;