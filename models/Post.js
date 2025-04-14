const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Post must have an author'],
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Comment must have a user'],
        },
        content: {
            type: String,
            required: [true, 'Comment must have content'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema)