const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/postController');

// POST
router.post('/createPost', createPost);