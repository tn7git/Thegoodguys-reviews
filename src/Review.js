// Review.js

import React from 'react';

const Review = ({ rating, title, text, customerName, submitDate }) => {
  return (
    <div className="review">
      <h2>{title}</h2>
      <p>Rating: {rating}</p>
      <p>{text}</p>
      <div className="space_between">
        <p>By: {customerName}</p>
        <p>{submitDate}</p>
      </div>
      
    </div>
  );
};

export default Review;
