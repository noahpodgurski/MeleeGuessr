const mongoose = require('mongoose');

const ClipSchema = new mongoose.Schema({
  clipSrc: { type: String, required: true, unique: true },
  reports: { type: Number, required: true },
  },
  { collection: 'clips' }
)

const model = mongoose.model('ClipSchema', ClipSchema);

module.exports = model;