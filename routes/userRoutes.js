const express = require('express');
const router = express.Router();
const { getUsers, registerUser } = require('../controllers/userController');

// GET all users
router.get('/', getUsers);

// POST register a user
router.post('/register', registerUser);

module.exports = router;
