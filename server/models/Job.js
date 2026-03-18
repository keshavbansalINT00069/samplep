const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  salary: {
    min: { type: Number },
    max: { type: Number },
  },
  type: { type: String, enum: ['full-time', 'part-time', 'contract', 'remote'], default: 'full-time' },
  skills: [String],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

jobSchema.index({ title: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema);
