import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartSkeleton from "./skeleton/CartSkeleton";
import ProductCart from "./ProductCart";
import Alert from "./Alert";
import { Card } from "flowbite-react";
import { getToken } from "../url/token";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await res.data[0];
        setCart(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [isClicked]);

  const onChangeQuantity = (id, newQty) => {
    setCart((prev) => {
      return {
        ...prev,
        product: prev.product.map((prod) => {
          return {
            ...prod,
            quantity:
              prod.productname._id === id && prod.size && prod.color
                ? newQty
                : prod.quantity,
          };
        }),
      };
    });
  };

  const removeItemHandler = (id, color, size) => {
    setCart((prev) => {
      return {
        ...prev,
        product: prev.product.filter(
          (prod) =>
            prod.productname._id !== id ||
            prod.size !== size ||
            prod.color !== color
        ),
      };
    });
  };

  const computeSubtotal = () => {
    let sum = 0;
    if (cart === undefined || cart.product.length === 0) {
      return sum;
    }

    cart.product.forEach((prod) => {
      sum += prod.productname.price * prod.quantity;
    });
    return sum + 50;
  };

  const onClickCheckout = async () => {
    const data = {
      ...cart,
      product: cart.product.map((prod) => ({
        ...prod,
        productname: prod.productname._id,
      })),
      cart: false,
      total: computeSubtotal(),
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/checkout`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.statusText === "OK") {
        setShowAlert(true);
        setIsClicked((prev) => !prev);

        setTimeout(() => {
          navigate("/shop");
        }, 5000);
      }
    } catch (error) {
      setShowAlert(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 h-screen py-16">
        {showAlert && (
          <Alert
            message={
              showAlert
                ? `Order transaction successful!`
                : `Failed to checkout cart . Please try again`
            }
            alert={showAlert}
          />
        )}
        <h1 className="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {/* PRODUCT LIST */}
          <div
            className={`${
              cart !== undefined && cart.product.length > 0 && `h-screen`
            } md:max-h-96 rounded-lg md:w-2/3 overflow-auto`}
          >
            {isLoading ? (
              <CartSkeleton />
            ) : cart !== undefined && cart.product.length > 0 ? (
              cart.product.map((prod, index) => {
                return (
                  <ProductCart
                    key={index}
                    product={prod}
                    onChangeQty={onChangeQuantity}
                    removeItem={removeItemHandler}
                  />
                );
              })
            ) : (
              <Card>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <p>Cart is empty !</p>
                </h5>
              </Card>
            )}
          </div>
          {/* PRODUCT SUMMARY */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                &#8369;{computeSubtotal().toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">
                &#8369;{`${cart === undefined ? `0.00` : `50.00`}`}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  &#8369;{computeSubtotal().toFixed(2)}
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button
              className={`mt-6 w-full rounded-md ${
                cart === undefined || cart.product.length === 0
                  ? `bg-blue-400 cursor-not-allowed`
                  : `bg-blue-600 hover:bg-blue-700`
              } py-1.5 font-medium text-blue-50 `}
              onClick={onClickCheckout}
              disabled={cart === undefined ? true : false}
            >
              Save Cart
            </button>
            <button
              className={`mt-6 w-full rounded-md ${
                cart === undefined || cart.product.length === 0
                  ? `bg-green-400 cursor-not-allowed`
                  : `bg-green-600 hover:bg-green-700`
              } py-1.5 font-medium text-blue-50 `}
              onClick={onClickCheckout}
              disabled={cart === undefined ? true : false}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
