import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Star from "./Star";
import ColorOption from "./ColorOption";
import SizeOption from "./SizeOption";
import Alert from "./Alert";
import { getToken } from "../url/token";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({
    product: [{ productname: "", color: "", size: "", price: 0 }],
  });
  const [showAlert, setShowAlert] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        const data = await res.data;
        setProduct(data);
        setOrder({ product: [{ productname: data._id, price: data.price }] });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const colorHandler = (color) => {
    const colorTrim = color.trim();

    setOrder((prev) => ({
      product: [{ ...prev.product[0], color: colorTrim }],
    }));
  };

  const sizeHandler = (size) => {
    const sizeTrim = size.trim();

    setOrder((prev) => ({
      product: [{ ...prev.product[0], size: sizeTrim }],
    }));
  };

  const isColorAndSizeSelected = order.product.every(
    (item) =>
      item.color !== "" && `color` in item && item.size !== "" && `size` in item
  );

  const addToCart = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        order,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        setShowAlert(true);
        setTimeout(() => {
          navigate(`../../shop`);
        }, 5000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        sessionStorage.removeItem("accessToken");
        alert("Session expired. Please login again.");
        setTimeout(navigate("../login"), 3000);
      } else {
        setShowAlert(false);
        setOrder({
          product: [{ productname: "", color: "", size: "" }],
        });
      }
    }
  };

  return (
    <>
      <section className="min-h-screen text-gray-700 body-font overflow-hidden bg-white">
        {showAlert !== undefined && (
          <Alert
            message={
              showAlert
                ? `Product added to cart successfuly!`
                : `Failed to add product in cart . Please try again`
            }
            alert={showAlert}
          />
        )}
        <div className="container px-5 py-10 md:py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <ProductCarousel images={product.images} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                LIFE NEEDS APPAREL
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <Star key={product._id} rating={product.rating} />
              </div>
              <p className="leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-col gap-2 md:flex-row md:items-center mt-6 pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex items-center">
                  <span className="mr-3">Color</span>
                  <div className="relative">
                    <ColorOption
                      color={product.color}
                      colorHandler={colorHandler}
                    />
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
                </div>
                <div className="flex md:ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <SizeOption size={product.size} sizeHandler={sizeHandler} />
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  &#8369; {product.price ? product.price.toFixed(2) : undefined}
                </span>
                <button
                  className={`${
                    !isColorAndSizeSelected ? `cursor-not-allowed` : ``
                  } flex ml-auto text-white bg-gray-800 bg-opacity-90 border-0 py-2 px-6 focus:outline-none hover:bg-black rounded`}
                  onClick={addToCart}
                  disabled={!isColorAndSizeSelected}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeline="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
