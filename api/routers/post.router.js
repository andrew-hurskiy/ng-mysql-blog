const express = require("express");
const postRouter = express.Router();
const db = require("../dal/db");

// Define routes for CRUD operations on posts
postRouter.get("/", (req, res) => {
  const query = "SELECT * FROM posts";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch blog posts" });
    } else {
      res.status(200).json(results);
    }
  });
});

postRouter.get("/:postId", (req, res) => {
  const postId = req.params.postId;
  const query = "SELECT * FROM posts WHERE id = ?";

  db.query(query, [postId], (err, posts) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch the blog post" });
    } else {
      if (posts.length === 0) {
        res.status(404).json({ message: "Blog post not found" });
      } else {
        res.status(200).json(posts[0]);
      }
    }
  });
});

postRouter.post("/", (req, res) => {
  const {
    id,
    author,
    heading,
    subHeading,
    section1,
    section2,
    section3,
    sectionHeading,
    createdAt,
  } = req.body;

  // Validate the input data here if necessary
  const query = `INSERT INTO posts 
    (id, author, heading, subHeading, section1, section2, section3, sectionHeading, createdAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      id,
      author,
      heading,
      subHeading,
      section1,
      section2,
      section3,
      sectionHeading,
      createdAt,
    ],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Unable to create the blog post" });
      } else {
        res.status(201).json({ message: "Blog post created successfully" });
      }
    },
  );
});

postRouter.put("/:postId", (req, res) => {
  const postId = req.params.postId;

  const {
    id,
    author,
    heading,
    subHeading,
    section1,
    section2,
    section3,
    sectionHeading,
    createdAt,
  } = req.body;

  const query = `UPDATE posts 
                SET 
                  id = ?, 
                  author = ?,
                  heading = ?,
                  subHeading = ?,
                  section1 = ?,
                  section2 = ?,
                  section3 = ?,
                  sectionHeading = ?,
                  createdAt = ?
                WHERE id = ?`;

  db.query(
    query,
    [
      id,
      author,
      heading,
      subHeading,
      section1,
      section2,
      section3,
      sectionHeading,
      createdAt,
      postId,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Unable to update the blog post" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Blog post not found" });
        } else {
          res.status(200).json({ message: "Blog post updated successfully" });
        }
      }
    },
  );
});

postRouter.delete("/:postId", (req, res) => {
  const postId = req.params.postId;
  const query = "DELETE FROM posts WHERE id = ?";

  db.query(query, [postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Unable to delete the blog post" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Blog post not found" });
      } else {
        res.status(200).json({ message: "Blog post deleted successfully" });
      }
    }
  });
});

module.exports = postRouter;
