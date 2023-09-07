const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const db = require("../dal/db");

commentRouter.get("/", (req, res) => {
  console.log("Get all comments for specific post...");
  const postId = req.params.postId;
  const query = "SELECT * FROM comments WHERE postId = ?";

  db.query(query, [postId], (err, comments) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch the comments" });
    } else {
      if (comments.length === 0) {
        res.status(404).json({ message: "Comments not found" });
      } else {
        res.status(200).json(comments);
      }
    }
  });
});

commentRouter.post("/", (req, res) => {
  const { id, content, user, date } = req.body;
  const postId = req.params.postId;
  const query = `INSERT INTO comments 
                (id, content, user, date, postId) 
                VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [id, content, user, date, postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch the comments" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Comments not found" });
      } else {
        res.status(200).json({ message: "Comment added" });
      }
    }
  });
});



module.exports = commentRouter;
