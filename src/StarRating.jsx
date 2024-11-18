import { useState } from "react";
import Star from "./Star";

export default function StarRating({ max = 5, color, size }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  // Styles for the div that contains all the stars
  const starsStyles = {
    display: "flex", // Lays out the stars in a row (side by side)
  };

  // Styles for the paragraph element displaying the rating number
  const textStyles = {
    margin: 0, // Removes any default margin to avoid extra spacing
    lineHeight: 1, // Sets the line height to match the font size exactly, minimizing vertical spacing
  };

  // Styles for the container that holds both the stars and the rating text
  const ratingContainerStyles = {
    display: "flex", // Creates a flex container to align its children in a row
    alignItems: "center", // Vertically centers both stars and the rating text within the container
    gap: "6px", // Adds a 6px space between the stars and the rating text for visual separation
  };

  // Create an array of stars based on the `max` prop value
  const stars = Array.from({ length: max }, (_, i) => (
    <Star
      onClick={() => handleStarClick(i + 1)}
      onEnter={() => handleStarHoverOn(i + 1)}
      onLeave={() => handleStarHoverOff()}
      full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
      color={color}
      key={i}
      size={size}
    />
  ));

  // Function to handle star click event and update the rating state
  function handleStarClick(rating) {
    setRating(rating);
  }

  function handleStarHoverOn(rating) {
    setTempRating(rating);
  }

  function handleStarHoverOff() {
    setTempRating(0);
  }

  return (
    <div style={ratingContainerStyles}>
      {/* Container for both stars and rating text */}
      <div style={starsStyles}>
        {/* Container for the stars */}
        {stars}
      </div>
      <p style={textStyles}>{tempRating || rating || ""}</p>
      {/* Displays the current rating */}
    </div>
  );
}
