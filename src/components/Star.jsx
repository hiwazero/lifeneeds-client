const Star = (props) => {
  const computeAverage = (numbers) => {
    if (numbers.length === 0) {
      return 0;
    }

    let sum = 0;
    numbers.forEach((number) => {
      sum += number;
    });

    const average = sum / numbers.length;
    return average;
  };

  const averageRating =
    props.rating === undefined ? 0 : computeAverage(props.rating);
  const wholeNumber = Math.floor(averageRating);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= wholeNumber) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-500 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
  }

  return (
    <>
      <div className="flex items-center">
        {stars}
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {averageRating === 0 ? "No ratings" : `${averageRating.toFixed(1)} out of 5`}
        </p>
      </div>
    </>
  );
};

export default Star;
