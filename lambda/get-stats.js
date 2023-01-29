const Stat = require('./utils/stat');
const mongoose = require('mongoose');
const convert = require('./utils/convert');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


exports.handler = async (req) => {
  console.log(req);
  let userId;
  if (req.queryStringParameters){
    userId = req.queryStringParameters.userId;
  } else {
    userId = req.userId;
  }
  console.log(userId);
  if (!userId || typeof userId !== 'string'){
    return convert(400, "error", "Error grabbing stats");
  }
  
  const stat = await Stat.findOne({id: userId}).lean();
  if (stat){
    return convert(200, "ok", "Successfully grabbed data", stat);
  }
  
  return convert(400, "error", "Invalid email/password");
};

// const { getStats } = require('./get-stats');