// const BUCKET_IP = 'https://meleeguessr-clips.s3.amazonaws.com/';
// const SERVER_IP = 'http://localhost:4000';

const { createProxyMiddleware } = require('http-proxy-middleware');
// const { BUCKET_IP, SERVER_IP } = require('./config');
const BUCKET_IP = "process.env.REACT_APP_BUCKET_IP";
const SERVER_IP = "process.env.REACT_APP_SERVER_IP";

module.exports = (app) => {
  app.use(
    ['/videos/*'],
    createProxyMiddleware({
      target: BUCKET_IP,
      changeOrigin: true,
      pathRewrite: (req) => { return `${req.substring(8)}`} //removes /videos/
    })
  );

  app.use(
    ['/login', '/register'],
    createProxyMiddleware({
      target: SERVER_IP,
      changeOrigin: true,
    })
  );

  app.use( //i feel like this shouldn't work todo
    ['/update-stats', '/get-stats', '/get-all-stats'], 
    createProxyMiddleware({
      target: SERVER_IP,
      changeOrigin: true,
    })
  )
};