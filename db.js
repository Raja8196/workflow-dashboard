const { Sequelize } = require('sequelize');
require('dotenv').config();

const createDatabaseIfNotExists = async () => {
  const tempSequelize = new Sequelize(
    'postgres', // Connect to default postgres database
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres123',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false
    }
  );

  try {
    await tempSequelize.authenticate();
    console.log('Connected to PostgreSQL server');

    // Try to create the database
    try {
      await tempSequelize.query(`CREATE DATABASE ${process.env.DB_NAME || 'workflow_engine'};`);
      console.log(`Database ${process.env.DB_NAME || 'workflow_engine'} created successfully`);
    } catch (dbError) {
      if (dbError.message.includes('already exists')) {
        console.log(`Database ${process.env.DB_NAME || 'workflow_engine'} already exists`);
      } else {
        console.log('Database creation error:', dbError.message);
      }
    }

    await tempSequelize.close();
  } catch (error) {
    console.error('Unable to connect to PostgreSQL server:', error.message);
    await tempSequelize.close();
    throw error;
  }
};

const sequelize = new Sequelize(
  process.env.DB_NAME || 'workflow_engine',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();

    // Connect to the specific database
    await sequelize.authenticate();
    console.log('Connected to workflow_engine database');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database tables synchronized');
  } catch (error) {
    console.error('Database setup error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
