const Post = require('../models/Post');
const User = require('../models/User');
const { post } = require('../routes/userRoutes');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, author, status } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Title, content, and author are required' });
        }

        const existingUser = await User.findById(author)
        if (!existingUser) {
            return res.status(400).json({ message: 'Author does not exist' });
        }
        const newPost = await Post.create({
            title, 
            content,
            author,
            status 
        })
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create post' });
    }
}

module.exports = {
    createPost,
}