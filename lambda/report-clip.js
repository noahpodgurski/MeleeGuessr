const Clip = require('./utils/clip');
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

// report-clip
exports.handler = async (request, context, callback) => {
  console.log(request)
  const params = querystring.parse(request.body);
  const { clipSrc } = params;
  console.log(clipSrc)

  if (!clipSrc){
    return convert(400, "error", "Something went wrong...");
  }
  let _clip = null;
  try {
    _clip = await Clip.findOne({clipSrc}).lean();
  } catch(err){
    console.log(err);
  }
  if (_clip && _clip.clipSrc){
    await Clip.updateOne({clipSrc}, {
      reports: _clip.reports + 1
    })
  } else {
    // clip doesn't exist yet, create new
    const response = await Clip.create({
      clipSrc: clipSrc,
      reports: 1
    })
  }

  return convert(200, "success", "Clip reported, thank you");
};