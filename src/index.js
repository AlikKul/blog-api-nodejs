const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const commentRouter = require('./routers/comment');

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

app.listen(port, (err, res) => {
  if (err) {
    return console('Server was unable to start');
  }
  console.log('Server is up and running on port ' + port);
})