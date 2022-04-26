const BUCKET_IP = 'https://meleeguessr-clips.s3.amazonaws.com/';
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
};