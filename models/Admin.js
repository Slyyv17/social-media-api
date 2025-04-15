const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    profilePicture: {
        type: String,
        default: 'https://i.pinimg.com/736x/53/b9/fb/53b9fb994aaf9fee850bbc6273d30b0c.jpg'
    },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);