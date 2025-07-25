import mongoose from "mongoose";

const UserLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  contextId: { type: mongoose.Schema.Types.ObjectId, ref: 'Context', required: true, index: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String },
});

export default mongoose.models.UserLog || mongoose.model('UserLog', UserLogSchema);
