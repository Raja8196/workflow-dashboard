const express = require('express');
const router = express.Router();
const Execution = require('../models/Execution');

// Get all executions
router.get('/', async (req, res) => {
  try {
    const executions = await Execution.findAll();
    res.json(executions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;