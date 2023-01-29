const Stat = require('./utils/stat');
const mongoose = require('mongoose');

const convert = (code, status, message="", data="") => {
  return {statusCode: code, headers: {'Access-Control-Allow-Origin': '*'}, body: JSON.stringify({status, message, data})};
}

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//get-all-stats
exports.handler = async (req) => {
  const _stats = await Stat.find({}).lean()
  const stats = _stats.map((stat) => {
    delete stat.userId;
    return stat;
  })

  if (stats){
    return convert(200, "ok", "Successfully grabbed data", stats);
  }

  return convert("400", "error", "Invalid email/password");
};

// const { getStats } = require('./get-stats');