DROP DATABASE video_website;
CREATE DATABASE video_website;
USE video_website;

CREATE TABLE videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL
);

INSERT INTO videos (title, author, thumbnail, url)
VALUES ('Sample Video 1', 'John Doe', 'https://via.placeholder.com/300x200', 'https://www.youtube.com/watch?v=outcGtbnMuQ'),
       ('Sample Video 2', 'Jane Doe', 'https://via.placeholder.com/300x200', 'https://www.youtube.com/watch?v=SGUCcjHTmGY');

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
