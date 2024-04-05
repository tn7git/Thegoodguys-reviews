import React, { useState, useEffect } from 'react';
import Review from './Review';
import './App.css';

function App() {

  // State variables to store reviews data and visible reviews
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const reviewsPerPage = 10;

   // State variables for sorting
   const [sortCriteria, setSortCriteria] = useState('newest');
   const [sortOrder, setSortOrder] = useState('desc');

   // Fetch reviews data from reviews.json file when component mounts
  useEffect(() => {
    fetchReviews();
     //sortReviews('newest');
  }, []);

  // =========================== Function to fetch reviews data from reviews.json file ===========================
  const fetchReviews = () => {
    fetch('https://tn7git.github.io/Thegoodguys-reviews/reviews.json') // Fetch reviews data from reviews.json in public folder
      .then(response => response.json()) // Parse response JSON
      .then(data => {
        setReviews(data); // Set reviews data to state
        setVisibleReviews(data.slice(0, reviewsPerPage)); // Set initial visible reviews
      })
      .catch(error => console.error('Error fetching reviews:', error));
  };

  // Function to load more reviews when "Load More" button is clicked
  const loadMoreReviews = () => {
    const newIndex = startIndex + reviewsPerPage; //set newIndex to 10 (array start with 0)
    setVisibleReviews([...visibleReviews, ...reviews.slice(newIndex, newIndex + reviewsPerPage)]); //extract a section of reviews array and returns a new array containing the extracted reviews
    setStartIndex(newIndex);
  };



 //  ========================= Function to handle sorting ===========================
 const handleSortChange = event => {
  const { value } = event.target;  // Get the value of the selected sorting criteria 
  setSortCriteria(value);
  sortReviews(value);
};

const sortReviews = criteria => {
  const sortedReviews = [...reviews]; // Create a copy of the reviews array
 
  sortedReviews.sort((a, b) => {
    if (criteria === 'newest') {
      return sortOrder === 'asc' ? new Date(a.SUBMISSION_DATE) - new Date(b.SUBMISSION_DATE) : new Date(b.SUBMISSION_DATE) - new Date(a.SUBMISSION_DATE);
    } else if (criteria === 'highest') {
      return sortOrder === 'asc' ? a.RATING - b.RATING : b.RATING - a.RATING;
    } else if (criteria === 'lowest') {
      return sortOrder === 'asc' ? b.RATING - a.RATING : a.RATING - b.RATING;
    }
  });
  setReviews(sortedReviews);
  setVisibleReviews(sortedReviews.slice(0, reviewsPerPage));
};




  return (
    <div className="App">
      <h1>Reviews</h1>

      <div>
        {/* Dropdown for sorting */}
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="newest">Newest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
        
      </div>

      <div className="reviews-container">
        {visibleReviews.map(review => (
          <Review
            key={review.REVIEW_ID}
            rating={review.RATING}
            title={review.REVIEW_TITLE}
            text={review.REVIEW_TEXT}
            customerName={review.CUSTOMER_NAME}
            submitDate={review.SUBMISSION_DATE}
          />
        ))}
      </div>

      {/* Only render "Load More" button if there are more reviews to load */}
      {visibleReviews.length < reviews.length && (
        <button onClick={loadMoreReviews}>Load More</button>
      )}
    </div>
  );
}

export default App;
