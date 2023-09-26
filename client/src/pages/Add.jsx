import axios from "axios";
import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const defaultCover = "https://i.imgur.com/J5LVHEL.jpg";
  const [book, setBook] = useState({
    title: "",
    author: "",
    desc: "",
    price: null,
    cover: defaultCover,
    rating: 0,
  });
  const [error, setError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [rating, setRating] = useState(1);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));

    if (name === "cover") {
      setImagePreview(value);
    }
  };
  const onStarClick = (nextValue) => {
    setRating(nextValue);
    setBook((prev) => ({ ...prev, rating: nextValue }));
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
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
          <div className="rating-stars">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={onStarClick.bind(this)}
            />
          </div>
          <input
            type="text"
            placeholder="Book Cover URL"
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
