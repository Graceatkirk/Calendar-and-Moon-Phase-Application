import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { User } from '../models';


export async function register(req, res) {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = await user.create({
      user: req.body.email,
      password: hashedPassword
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering email', error });
  }
}

export async function login(req, res) {
  try {
    const user = await User.findOne({ where: { user: req.body.user } });
    if (user && await compare(req.body.password, user.password)) {
      const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
}