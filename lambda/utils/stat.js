const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  correct: { type: Number, required: true },
  incorrect: { type: Number, required: true },
  highScore: { type: Number, required: true },
  games: { type: Number, requied: true },
  },
  { collection: 'stats' }
)

const model = mongoose.model('StatSchema', StatSchema);

module.exports = model;