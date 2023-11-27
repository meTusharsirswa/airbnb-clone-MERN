const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const api = require('./routes/api');

dotenv.config(); 

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error while connecting to the database:', err);
});

db.once('open', () => {
  console.log('Database connected successfully');
});

const app = express();

// Configure CORS before defining routes
const corsOptions = {
  origin: process.env.CORS_ALLOW_ORIGIN || '*', // Replace with the actual origin of your frontend
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.use('/', api);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
