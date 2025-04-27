require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');

const app = express();

// Mock database connection since we can't connect to real MongoDB
console.log('Mocking MongoDB connection...');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// Mock data endpoint for demo
app.get('/api/demo/courses', (req, res) => {
  res.json([
    {
      _id: '1',
      titleRu: 'Основы КИПиА',
      titleKz: 'КИПиА негіздері',
      descriptionRu: 'Базовый курс по контрольно-измерительным приборам',
      category: 'КИПиА',
      durationEstimate: 20
    },
    {
      _id: '2',
      titleRu: 'Технологические процессы',
      titleKz: 'Технологиялық процестер',
      descriptionRu: 'Основы технологических процессов в нефтегазовой отрасли',
      category: 'Технолог',
      durationEstimate: 30
    }
  ]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try these demo endpoints:
  - GET /api/demo/courses
  - POST /api/auth/login (with {email: "test@test.com", password: "password"})
  - POST /api/auth/register`);
});
