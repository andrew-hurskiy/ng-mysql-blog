const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "tom",
  password: "tom",
  database: "blog",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Define routes for CRUD operations on comments that belong to a post
commentRouter.get("/", (req, res) => {
  const postId = req.params.postId;

  const query = "SELECT * FROM comments WHERE postId = ?";
  db.query(query, [postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch the comments" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Comments not found" });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

commentRouter.get("/:commentId", (req, res) => {
  const postId = req.params.postId;

  const query = "SELECT * FROM comments WHERE postId = ?";
  db.query(query, [postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch the comments" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Comments not found" });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

commentRouter.post("/", (req, res) => {
  console.log("Inside of posts comments");

  const { id, content, user, date } = req.body;

  const postId = req.params.postId;

  const query = `INSERT INTO comments 
                (id, content, user, date, postId) 
                VALUES (?, ?, ?, ?, ?) 
                WHERE postId = ?`;

  console.log("ID ", id);
  console.log("content ", content);
  console.log("user ", user);
  console.log("date ", date);
  console.log("postId ", postId);

  db.query(query, [id, content, user, date, postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch the comments" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Comments not found" });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
  // Handle creating a new comment for a specific post (req.params.postId)
});

commentRouter.delete("/:commentId", (req, res) => {
  const commentId = req.params.id;
  const query = "DELETE FROM comments WHERE id = ?";

  db.query(query, [commentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to delete the comment" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Comment not found" });
      } else {
        res.status(200).json({ message: "Commentdeleted successfully" });
      }
    }
  });
  // Handle deleting a comment by ID for a specific post (req.params.postId)
});

module.exports = commentRouter;
