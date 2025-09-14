const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8080;

app.use(
  ['/api', '/notes'],
  createProxyMiddleware({
    target: 'http://notes_backend:4000',
    changeOrigin: true,
    pathRewrite: {
      '^/notes': '/api/notes',
      '^/api': '/api',
    },
  })
);

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
