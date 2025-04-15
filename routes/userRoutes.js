const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser, getUserById } = require('../controllers/userController');

// GET all users
router.get('/', getUsers);

// POST register a user
router.post('/register', registerUser);


// POST login user
router.post('/login', loginUser);

// GET a single user by ID
router.get('/:id', getUserById);

module.exports = router;
