const express = require('express');
const router = express.Router();
const Step = require('../models/Step');

// Get all steps
router.get('/', async (req, res) => {
  try {
    const steps = await Step.findAll();
    res.json(steps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;