import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    references: 'User',
    required: true,
  },
});

export default mongoose.model('Task', taskSchema);