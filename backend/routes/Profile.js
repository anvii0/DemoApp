const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); 

router.post('/', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ message: 'Profile saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving profile', error: err.message });
  }
});

module.exports = router;