import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  frequency: { type: String, required: true }, // e.g., "Every day", "Alternate days"
}, { timestamps: true });

export default mongoose.models.Habit || mongoose.model('Habit', HabitSchema);
