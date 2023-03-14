// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
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

app.get("/videos", async (req, res) => {
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
