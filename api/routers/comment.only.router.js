const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const db = require("../dal/db");

commentRouter.get("/:commentId", (req, res) => {
  let commentId = req.params.commentId;
  const query = "SELECT * FROM comments WHERE id = ?";

  db.query(query, [commentId], (err, comments) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch the comments" });
    } else {
      if (comments.length === 0) {
        res.status(404).json({ message: "Comments not found" });
      } else {
        res.status(200).json(comments[0]);
      }
    }
  });
});

commentRouter.delete("/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const query = "DELETE FROM comments WHERE id = ?";

  db.query(query, [commentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to delete the comment" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Comment not found" });
      } else {
        res.status(200).json({ message: "Comment deleted successfully" });
      }
    }
  });
});

commentRouter.put("/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const { content, date } = req.body;

  const query = `UPDATE comments 
                SET 
                  content = ?,
                  date = ?
                WHERE id = ?`;
  db.query(query, [content, date, commentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to update comment" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Comment not found" });
      } else {
        res.status(200).json({ message: "Comment updated successfully" });
      }
    }
  });
});

module.exports = commentRouter;
