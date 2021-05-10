const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  console.log('收到请求');
  res.json([
     { id: 0, name: 'express' }
  ]);
});

app.listen(3456, () => {
  console.log('监听3456端口');
});
