require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
// Note: These require a 'routes' directory with the corresponding files.
app.use('/api/orders', require('./routes/orders'));
app.use('/api/workflows', require('./routes/workflows'));
app.use('/api', require('./routes/steps'));
app.use('/api', require('./routes/rules'));
app.use('/api', require('./routes/executions'));
app.use('/api/dashboards', require('./routes/dashboards'));

// Root route for health check
app.get('/', (req, res) => {
  res.send('Workflow Engine API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
