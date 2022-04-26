// const { SERVER_IP } = require('../config');
// const SERVER_IP = 'http://localhost:4000/';
const SERVER_IP = 'http://44.204.159.79:4000/';
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    ['/clips'],
    createProxyMiddleware({
      target: SERVER_IP,
      changeOrigin: true
    })
  );


  app.use(
    ['/videos/*'],
    createProxyMiddleware({
      target: 'https://meleeguessr-clips.s3.amazonaws.com/',
      changeOrigin: true,
      pathRewrite: (req) => { console.log(`REQ: ${req}`); return req.substring(7)}
    })
  );
};