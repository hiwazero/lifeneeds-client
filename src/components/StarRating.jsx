import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getToken } from "../url/token";
import axios from "axios";

const StarRating = ({ productId, orderId, rated }) => {
  const [rating, setRating] = useState(0);
  const [rateClicked, setRateClicked] = useState(false);

  const handleStarClick = (clickedIndex) => {
    setRating(clickedIndex);
  };

  const rateClickedHandler = () => {
    setRateClicked(true);
  };

  const submitRating = async (e) => {
    e.preventDefault();
    const ratingArray = [rating];
    const ratingObj = { rating: ratingArray };
    rateClickedHandler();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/rating/${orderId}/${productId}`,
        ratingObj,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-center gap-0.5 my-2 ">
      {rated === 0 ? (
        <>
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              className={`star h-5 w-5 ${
                index < rating ? "fill-amber-400" : "fill-gray-300"
              }`}
              viewBox="0 0 256 256"
              onClick={() => handleStarClick(index + 1)}
            >
              <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
            </svg>
          ))}

          {rateClicked === false && (
            <Button
              color="success"
              size="xs"
              className="ml-3"
              onClick={submitRating}
              disabled={rating === 0 || rated ? true : false}
            >
              Send Rating
            </Button>
          )}
        </>
      ) : (
        Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            className={`star h-5 w-5 ${
              index < rated ? "fill-amber-400" : "fill-gray-300"
            }`}
            viewBox="0 0 256 256"
          >
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
        ))
      )}
    </div>
  );
};

export default StarRating;
