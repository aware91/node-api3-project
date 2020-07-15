const express = require('express');
const usersRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/users', usersRouter);
server.use('api/post', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request, ${req.url} url, and date`);
  next()
};

function errorHandler(error, req, res, next) {
  console.log('error: ', error.message);
  const code = error.status || error.statusCode || 400;
  res.status(code).json(error)
}
server.use(errorHandler);

module.exports = server;
