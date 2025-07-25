import mongoose from "mongoose";

const ContextSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  suggestions: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Context || mongoose.model('Context', ContextSchema);
