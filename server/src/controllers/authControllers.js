import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Ensure the correct path to your User model

// Function to register a new user
export async function register(req, res) {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Create a new user
    const newUser = await User.create({ email, password }); // You may want to hash the password before saving

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
}

// Function to log in a user
export async function login(req, res) {
    const { email, password } = req.body;

    // Validate user credentials
    const user = await User.findOne({ where: { email } });
    if (!user || !user.validPassword(password)) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
}
