

DROP DATABASE IF EXISTS blog;

CREATE DATABASE blog;

USE blog;

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id varchar(30) not null,
  author varchar(30),
  heading varchar(30),
  subHeading varchar(30),
  section1 varchar(100),
  section2 varchar(100),
  section3 varchar(100),
  sectionHeading varchar(30),
  createdAt datetime,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id varchar(50) not null,
  content varchar(255),
  user varchar(50),
  date date,
  postId varchar(50) not null,
  FOREIGN KEY (postId) REFERENCES posts(id),
  PRIMARY KEY(id)
);

INSERT INTO posts
VALUES (
  1,
  'Andriy',
  'Heading 1', 
  'SubHeading',
  'section 1 text',
  'section 2 text', 
  'section 3 text', 
  'sectionHeading',
  NOW()
);

INSERT INTO comments
VALUES (
  1,
  'Comment A',
  'Andriy',
  NOW(),
  1
);