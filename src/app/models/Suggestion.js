import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({
  contextId: { type: mongoose.Schema.Types.ObjectId, ref: 'Context', required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Suggestion || mongoose.model('Suggestion', SuggestionSchema);
