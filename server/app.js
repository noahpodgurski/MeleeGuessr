const express = require('express');
const fs = require('fs');
const path = require('path');
const cors  = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(req.url)
  next();
})


app.get('/clips', (req, res) => {
  fs.readFile('./mango.json', 'utf8', (err, data) => {
    if (err)
      console.log(err)
    else
      // console.log(JSON.parse(data))
      res.json(JSON.parse(data))
  });
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log(`Server Online at  ${process.env.IP}:${process.env.PORT}`);
});