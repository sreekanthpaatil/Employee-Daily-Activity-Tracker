import express from 'express';
import {
  authenticate, getUser, getEmployees, updateUser, getTasks,
} from '../controllers/user.js';

const router = express.Router();

router.post('/auth', authenticate);
router.get('/employees', getEmployees);
router.get('/:id', getUser);
router.get('/tasks/:id', getTasks);
router.patch('/:id', updateUser);

export default router;