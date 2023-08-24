const ColorOption = (props) => {
 
  const handleSelectChange = (e) => {
    props.colorHandler(e.target.value)
  };

  return (
    <>
      <div className="relative">
        <select
          className="rounded border appearance-none border-gray-400 py-2 focus:outline-none text-base pl-3 pr-10"
          onChange={handleSelectChange}
        >
          <option key={-1} value={undefined}>
            {undefined}
          </option>

          {props.color !== undefined &&
            props.color.map((clr, index) => {
              return (
                <option key={index} value={clr}>
                  {clr}
                </option>
              );
            })}
        </select>
        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeline="round"
            strokeWidth="2"
            className="w-4 h-4"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </div>
    </>
  );
};

export default ColorOption;
