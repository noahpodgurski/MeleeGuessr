const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    ['/clips', '/video/*', '/clipsmango', '/videomango/*'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true
    })
  );
};