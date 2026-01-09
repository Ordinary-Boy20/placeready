
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Placeholder)
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placeready')

// --- ROUTES ---

/**
 * Profile API (Dummy Endpoints to satisfy fullstack requirements)
 * In actual app, Firestore is used directly from frontend.
 */

app.get('/api/profile', async (req, res) => {
  // Middleware should handle token verification
  // const user = await User.findById(req.user.id);
  res.json({ message: "Mock profile data would be returned here." });
});

app.put('/api/profile', async (req, res) => {
  // middleware should handle token verification
  res.json({ message: "Mock profile update successful." });
});

// Submit a Learning Post
app.post('/api/learning-posts', async (req, res) => {
  try {
    const { title, type, company, role, year, whatIDid, whatWentWrong, whatILearned, keyTakeaway, seniorId, seniorName, seniorCompany, seniorCollege } = req.body;
    
    if (!title || !type || !company || !role || !year || !whatIDid || !whatWentWrong || !whatILearned || !keyTakeaway) {
      return res.status(400).json({ message: "Post must strictly follow the required 7-field structure." });
    }

    // Save logic...
    res.status(201).json({ message: "Post saved." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
