const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://attendance-management-dasboard.onrender.com',
      changeOrigin: true
    })
  );
};
