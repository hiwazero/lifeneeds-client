import { Buffer } from "buffer";

const ProductCart = (props) => {
  const onAdd = () => {
    props.onChangeQty(
      props.product.productname._id,
      props.product.quantity + 1
    );
  };

  const onSubtract = () => {
    if (props.product.quantity > 1) {
      props.onChangeQty(
        props.product.productname._id,
        props.product.quantity - 1
      );
    } else {
      props.removeItem(
        props.product.productname._id,
        props.product.color,
        props.product.size
      );
    }
  };

  const onRemove = () => {
    props.removeItem(
      props.product.productname._id,
      props.product.color,
      props.product.size
    );
  };

  const base64Image = Buffer.from(props.product.productname.images[0]).toString(
    "base64"
  );

  return (
    <>
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
          src={`data:image/png;base64,${base64Image}`}
          alt="product-image"
          className="w-full rounded-lg sm:w-40 md:h-36"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">
              {props.product.productname.name}
            </h2>
            <div className="flex flex-col">
              <p className="mt-1 text-xs text-gray-700">
                Size: {props.product.size}
              </p>
              <p className="mt-1 text-xs text-gray-700">
                Color: {props.product.color}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span
                className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-gray-700 hover:text-white"
                onClick={onSubtract}
              >
                {" "}
                -{" "}
              </span>
              <span className="py-2 px-3 h-8 w-8 border bg-white text-center text-xs outline-none">
                {props.product.quantity}
              </span>
              <span
                className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-gray-700 hover:text-white"
                onClick={onAdd}
              >
                {" "}
                +{" "}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">
                &#8369;{props.product.productname.price.toFixed(2)}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                onClick={onRemove}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCart;
