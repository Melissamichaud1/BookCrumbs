import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });
  const [error, setError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/books/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        setError(true);
      }
    };
    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
    if (name === "cover") {
      setImagePreview(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/books/${bookId}`,
        book
      );
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="app updateBackground">
      <div className="backgroundOverlay"></div>
      <div className="innerContainer">
        <div className="form">
          <h1>Update the Book</h1>
          <input
            type="text"
            placeholder="Book title"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="Book desc"
            name="desc"
            value={book.desc}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Book price"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Book cover"
            name="cover"
            value={book.cover}
            onChange={handleChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Cover Preview"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
          <button onClick={handleClick}>Update</button>
          {error && "Something went wrong!"}
          <Link to="/" style={{ color: "white" }}>
            See all books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Update;
