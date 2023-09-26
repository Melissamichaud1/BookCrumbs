import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const defaultCover = "https://i.imgur.com/J5LVHEL.jpg";
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: defaultCover,
  });
  const [error, setError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));

    if (name === "cover") {
      setImagePreview(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!book.cover) {
      setBook((prev) => ({ ...prev, cover: defaultCover }));
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/books`, book);
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
          <h1>Add New Book</h1>
          <input
            type="text"
            placeholder="Book title"
            name="title"
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="Book desc"
            name="desc"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Book price"
            name="price"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Book cover URL"
            name="cover"
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
          <button onClick={handleClick}>Add</button>
          {error && <p>Something went wrong!</p>}
          <Link to="/" style={{ color: "white" }}>
            See all books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Add;
