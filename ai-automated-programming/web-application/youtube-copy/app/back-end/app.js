// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

async function createConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

// Middleware to verify the JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Registration route
app.post(
  "/register",
  [
    body("username").isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const connection = await createConnection();
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await connection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [req.body.username, hashedPassword]
      );
      connection.end();
      res.sendStatus(201);
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while registering user" });
    }
  }
);

// Login route
app.post("/login", async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [req.body.username]
    );
    connection.end();

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const user = rows[0];
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ accessToken });
    } else {
      res.status(400).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// Protected route for fetching videos
app.get("/videos", authenticateToken, async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query("SELECT * FROM videos");
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "An error occurred while fetching videos" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
