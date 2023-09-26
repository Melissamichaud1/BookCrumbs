import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

// Get all books
app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.json(data);
  });
});

// Get one book
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    if (data.length < 1)
      return res.status(404).json({ message: "Book not found" });
    return res.json(data[0]);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books(`title`, `author`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error in POST /books:", err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
    res.status(201).json({ message: "Book added successfully", data: data });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `author`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error("Error in POST /books:", err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
