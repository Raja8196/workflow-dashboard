const express = require('express');
const router = express.Router();
const DashboardConfig = require('../models/DashboardConfig');

// Get dashboard config
router.get('/', async (req, res) => {
  try {
    const config = await DashboardConfig.findOne();
    res.json(config || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;