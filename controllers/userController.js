const User = require("../models/User");

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

module.exports = {
    registerUser,
    getUsers
}