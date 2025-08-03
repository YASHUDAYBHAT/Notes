import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  // Add other fields if needed
}, { timestamps: true });

// ✅ Correct: Use mongoose.model, not new mongoose.Model
const Note = mongoose.model('Note', noteSchema);

export default Note;
