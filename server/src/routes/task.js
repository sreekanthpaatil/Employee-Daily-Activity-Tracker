import express from 'express';
import {
  createTask, pieData, barData, updateTask, deleteTask, filterTasks,
} from '../controllers/task.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createTask);
router.post('/pie', pieData);
router.post('/bar', barData);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/date', filterTasks);

export default router;