const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'tom',
  password: 'tom',
  database: 'blog',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create a new blog post
app.post('/posts', (req, res) => {
  const {
    id,
    author,
    heading,
    subHeading,
    section1,
    section2,
    section3,
    sectionHeading,
    createdAt } = req.body;

  // Validate the input data here if necessary
  const query = `INSERT INTO posts 
    (id, author, heading, subHeading, section1, section2, section3, sectionHeading, createdAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.query(query,
    [id, author, heading, subHeading, section1, section2, section3, sectionHeading, createdAt],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Unable to create the blog post' });
      } else {
        res.status(201).json({ message: 'Blog post created successfully' });
      }
    });
});

// Get all blog posts
app.get('/posts', (req, res) => {
  console.log('Inside of get posts')
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Unable to fetch blog posts' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get a single blog post by ID
app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const query = 'SELECT * FROM posts WHERE id = ?';
  db.query(query, [postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Unable to fetch the blog post' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'Blog post not found' });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

// Update a blog post by ID
app.put('/posts/:id', (req, res) => {

  const postId = req.params.id;

  const {
    id,
    author,
    heading,
    subHeading,
    section1,
    section2,
    section3,
    sectionHeading,
    createdAt } = req.body;


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
  db.query(query,
    [id, author, heading, subHeading, section1, section2, section3, sectionHeading, createdAt],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Unable to update the blog post' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: 'Blog post not found' });
        } else {
          res.status(200).json({ message: 'Blog post updated successfully' });
        }
      }
    });
});

app.delete('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const query = 'DELETE FROM posts WHERE id = ?';
  db.query(query, [postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Unable to delete the blog post' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Blog post not found' });
      } else {
        res.status(200).json({ message: 'Blog post deleted successfully' });
      }
    }
  });
});

// Add comment by postid
app.post('/post/:postId/comments', (req, res) => {

  console.log('Inside of posts comments')

  const {
    id, content,
    user, date
  } = req.body

  const postId = req.params.postId;

  const query = `INSERT INTO comments 
                (id, content, user, date, postId) 
                VALUES (?, ?, ?, ?, ?) 
                WHERE postId = ?`

  console.log('ID ', id);
  console.log('content ', content);
  console.log('user ', user);
  console.log('date ', date);
  console.log('postId ', postId);

  db.query(query, [id, content, user, date, postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Unable to fetch the comments' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'Comments not found' });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

app.get('/posts/:postId/comments', (req, res) => {

  const postId = req.params.postId;

  const query = 'SELECT * FROM comments WHERE postId = ?';
  db.query(query, [postId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Unable to fetch the comments' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: 'Comments not found' });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});



app.delete('/comments/:id', (req, res) => {

  const commentId = req.params.id;
  const query = 'DELETE FROM comments WHERE id = ?';

  db.query(query, [commentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Unable to delete the comment' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        res.status(200).json({ message: 'Commentdeleted successfully' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
