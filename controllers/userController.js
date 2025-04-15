const User = require("../models/User");
const generateToken = require('../utils/generateToken')

const registerUser = async (req, res) => {
    try {
        const { username, email, password, fullname } = req.body;
        // check if the user exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create a new user
        const newUser = await User.create({
            fullname,
            username,
            email,
            password,
        });
        console.log(newUser);
        res.status(201).json({message: "User successfully created"})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error:  error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                bio: user.bio,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find().select('-password') // exclude password from result
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}

// get user by id 
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById
}