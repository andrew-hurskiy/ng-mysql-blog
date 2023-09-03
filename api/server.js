const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const postRouter = require("./routers/post.router");
const commentRouter = require("./routers/comment.router");
const commentOnlyRouter = require("./routers/comment.only.router");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/post(s)?", postRouter);
app.use("/comment/", commentOnlyRouter);
app.use("/post/:postId/comments", commentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
