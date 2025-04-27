const express = require('express');
const router = express.Router();

// Mock authentication
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    return res.json({
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email,
        name: 'Demo User',
        role: 'student'
      }
    });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  if (email && password && name) {
    return res.json({
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: '2',
        email,
        name,
        role: 'student'
      }
    });
  }
  res.status(400).json({ success: false, message: 'Please provide all fields' });
});

module.exports = router;
