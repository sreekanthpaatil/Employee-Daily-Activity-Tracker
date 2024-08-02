import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const authenticate = async (req, res) => {
  const user = req.body;
  const { username } = req.body;
  const { password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({ ...user, password: hashedPassword });

      const token = jwt.sign({ username: result.username, id: result._id }, 'test', { expiresIn: '9999 years' });

      res.status(200).json({ result, token });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, 'test', { expiresIn: '1h' });

      res.status(200).json({ result: existingUser, token });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('tasks');
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getEmployees = async (req, res) => {
  try {
    const users = await User.find({ role: 'Employee' }); // Filter users by role "Employee"
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { ...user, id }, { new: true });

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('tasks'); // Filter users by role "Employee"
    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};