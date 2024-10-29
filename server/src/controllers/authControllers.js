// src/controllers/authControllers.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Ensure bcrypt is imported
import { User } from '../config/database.js'; // Import User from the database configuration

// Function to register a new user
export const register = async (req, res) => {
    const { username, email, password } = req.body; // Include email

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } }); // Check by email
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        const newUser = await User.create({ username, email, password_hash: hashedPassword }); // Adjust based on your model field
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Function to log in a user
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate user credentials
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password_hash); // Use password_hash field
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};

