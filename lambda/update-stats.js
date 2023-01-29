const Stat = require('./utils/stat');
const mongoose = require('mongoose');
const convert = require('./utils/convert');
const querystring = require('querystring');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//update-stats
exports.handler = async (request, context, callback) => {
  console.log(request)
  const params = querystring.parse(request.body);
  let { stat } = params;
  stat = JSON.parse(stat);
  console.log(stat)

  if (!stat.userId){
    return convert(400, "error", "Something went wrong...");
  }
  let _stat = null;
  try {
    _stat = await Stat.findOne({userId: stat.userId}).lean();
  } catch(err){
    console.log(err);
  }
  if (_stat && _stat.userId){
    await Stat.updateOne({userId: stat.userId}, {
      correct: _stat.correct + (stat.wasCorrect ? 1 : 0),
      incorrect: _stat.incorrect + (stat.wasCorrect ? 0 : 1),
      highScore: (_stat.highScore < stat.score) ? stat.score : _stat.highScore,
      games: stat.final ? _stat.games+1 : _stat.games
    })
    // stat already exists, update it
    // return res.json({ status: 'ok', message: 'Successfully logged in', token });
  } else {
    // stat doesn't exist yet, create new
    const response = await Stat.create({
      userId: stat.userId,
      username: stat.username,
      correct: stat.wasCorrect ? 1 : 0,
      incorrect: stat.wasCorrect ? 0 : 1,
      highScore: stat.wasCorrect ? 1 : 0,
      games: stat.final ? 1 : 0
    })
  }

  return convert(200, "success", "beep boop");
};