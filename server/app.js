const express = require('express');
const fs = require('fs');
const path = require('path');
const cors  = require('cors');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(req.url)
  next();
})


app.get('/video/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  // create a read stream for the video hello.mp4
  const rs = fs.createReadStream(`./assets/${fileName}.mp4`);

  // get size of the video file
  const { size } = fs.statSync(`./assets/${fileName}.mp4`);

  // set header
  // including size of file and type of file
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Content-Length", size);

  // start streaming the video
  // using the pipe() method
  rs.pipe(res);
})

app.get('/clips', (req, res) => {
  fs.readFile('./clips.json', 'utf8', (err, data) => {
    if (err)
      console.log(err)
    else
      // console.log(JSON.parse(data))
      res.json(JSON.parse(data))
  });
})


// app.get('/video', (req, res) => {
//   res.sendFile('assets/test.mp4', { root: __dirname });
// })

// app.get('/video/test', (req, res, next) => {
//   // if (fs.existsSync('./assets/test.mp4')) {
//     res.setHeader('Content-Type', 'video/mp4');
//     // res.sendFile('/assets/test.mp4', { root: __dirname });
//     var options = {
//       root: path.join(__dirname)
//     }

//     var fileName = '/assets/leslee.mp4';
//     res.sendFile(fileName, options, function (err) {
//       if (err) {
//           next(err);
//       } else {
//           console.log('Sent:', fileName);
//       }
//   });
//   // } 
// })


app.listen(4000, () => {
  console.log("Server online");
})