const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const commentRouter = require('./routers/comment');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

app.use((err, req, res, next) => {
  const { statusCode = 400, message } = err;
  res.status(statusCode).json({
    status: "Error",
    statusCode,
    message
  });
})

app.listen(port, (err, res) => {
  console.log(`Server is up running. Listening at port ${port}`);
})

module.exports = app;