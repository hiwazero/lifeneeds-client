import { Buffer } from "buffer";
import Star from "./Star";
import { Link } from "react-router-dom";

const ShopCard = (props) => {
  const base64Image = Buffer.from(props.product.images[0]).toString("base64");

  return (
    <>
      <div className="w-full p-4 md:w-1/2 lg:w-1/4">
        <a className="relative block h-96 overflow-hidden rounded">
          <img
            alt="ecommerce item"
            className="block h-full w-full object-fill object-center cursor-pointer"
            src={`data:image/png;base64,${base64Image}`}
          />
        </a>
        <div className="mt-4">
          <h2 className="title-font text-lg font-medium text-gray-900">
            {props.product.name}
          </h2>
          <h2 className="title-font text-xl font-medium text-gray-900">
            &#8369; {props.product.price.toFixed(2)}
          </h2>
          <Star id={props.product._id} rating={props.product.rating} />
          <Link to={`../product/${props.product._id}`}>
            <button className="bg-gray-800 bg-opacity-90 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-black font-bold my-3 py-1 px-4 rounded">
              View Product
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
