const express = require('express');
const fs = require('fs');
const path = require('path');
const cors  = require('cors');

const app = express();

// app.get('/video', (req, res) => {
//   res.sendFile('assets/test.mp4', { root: __dirname });
// })
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
      res.json(JSON.parse(data))
  });
})

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


// // endpoint to fetch a single video's metadata
// app.get('/video/:id/data', (req, res) => {
//   // const id = parseInt(req.params.id, 10);
//   // res.json(videos[id]);
//   res.json({fakeData: "this is fake metadata"})
// });



// app.get('/video/:id', (req, res) => {
//   console.log('requested')
//   const path = `assets/${req.params.id}.mp4`;
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   console.log(path)
//   if (range) {
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0], 10);
//       const end = parts[1]
//           ? parseInt(parts[1], 10)
//           : fileSize-1;
//       const chunksize = (end-start) + 1;
//       const file = fs.createReadStream(path, {start, end});
//       const head = {
//           'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//           'Accept-Ranges': 'bytes',
//           'Content-Length': chunksize,
//           'Content-Type': 'video/mp4',
//       };
//       res.writeHead(206, head);
//       file.pipe(res);
//   } else {
//       const head = {
//           'Content-Length': fileSize,
//           'Content-Type': 'video/mp4',
//       };
//       res.writeHead(200, head);
//       fs.createReadStream(path).pipe(res);
//   }
// });

app.listen(4000, () => {
  console.log("Server online");
})