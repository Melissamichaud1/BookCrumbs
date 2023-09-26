import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/books`
        );
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, [books]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app updateBackground">
      <div className="backgroundOverlay"></div>
      <div className="innerContainer">
        <h1>BookCrumbs</h1>
        <button className="addHome">
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Add new book
          </Link>
        </button>

        <div className="books">
          {Array.isArray(books) ? (
            books.map((book) => (
              <div key={book.id} className="book">
                <img src={book.cover} alt="" />
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <p>{book.desc}</p>
                <span>${book.price}</span>
                <button
                  className="delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button className="update">
                  <Link
                    to={`/update/${book.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </button>
              </div>
            ))
          ) : (
            <p>Loading or no books available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
