// models/TimeEntry.js
import mongoose from 'mongoose';

const timeEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mobileUse: {
    hours: { type: Number, min: 0, max: 24, required: true },
    minutes: { type: Number, min: 0, max: 59, required: true }
  },
  productivity: {
    hours: { type: Number, min: 0, max: 24, required: true },
    minutes: { type: Number, min: 0, max: 59, required: true }
  },
  others: {
    hours: { type: Number, min: 0, max: 24, required: true },
    minutes: { type: Number, min: 0, max: 59, required: true }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.models.TimeEntry || mongoose.model('TimeEntry', timeEntrySchema);