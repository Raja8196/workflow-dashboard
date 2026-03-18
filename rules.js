const express = require('express');
const router = express.Router();
const Rule = require('../models/Rule');

// Get all rules
router.get('/', async (req, res) => {
  try {
    const rules = await Rule.findAll();
    res.json(rules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;