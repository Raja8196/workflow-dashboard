const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');

// Get all workflows
router.get('/', async (req, res) => {
  try {
    const workflows = await Workflow.findAll();
    res.json(workflows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;