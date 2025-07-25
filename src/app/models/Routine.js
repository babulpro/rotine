import mongoose from "mongoose";

const RoutineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timeSlot: { type: String, required: true },
  task: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Routine || mongoose.model('Routine', RoutineSchema);
