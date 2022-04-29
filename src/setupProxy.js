const BUCKET_IP = 'https://meleeguessr-clips.s3.amazonaws.com/';
const SERVER_IP = 'http://localhost:4000';
const { createProxyMiddleware } = require('http-proxy-middleware');
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
  )
};