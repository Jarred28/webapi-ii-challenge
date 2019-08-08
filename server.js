const express = require('express');

const userRouter = require('./db.router.js');
const server = express();

server.use(express.json());
server.use('/api/posts', userRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1>YAY</h1>
  `);
})

module.exports = server;
