import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import moment from "moment";

const TransactionCard = (props) => {
  //const moment = moment()

  const base64Image = (data) => {
    return Buffer.from(data).toString("base64");
  };

  return (
    <div className="my-5 bg-white rounded-lg overflow-hidden md:max-w-full border border-gray-400">
      <div className="px-4 py-2 border-b border-gray-200 flex justify-around">
        <div className="flex">
          <h2 className="font-semibold text-gray-800">Order Date : </h2>
          <h2 className="ml-2 font-semibold text-gray-800">
            {moment(props.order.createdAt).format("ll")}
          </h2>
        </div>

        <div className="flex">
          <h2 className="font-semibold text-gray-800">Status : </h2>
          <h2 className="ml-2 font-semibold text-gray-800">Completed</h2>
        </div>
      </div>

      <div className="max-h-32 flex flex-col divide-y divide-gray-200 overflow-y-auto">
        {props.order.product.map((prod, index) => {
          return (
            <div className="flex items-center py-4 px-6" key={index}>
              <img
                className="w-16 h-16 object-cover rounded"
                src={`data:image/png;base64,${base64Image(
                  prod.productname.images[0]
                )}`}
                alt="Product Image"
              />
              <div className="ml-3">
                <h3 className="text-gray-900 font-semibold">
                  {prod.productname.name}
                </h3>
                <div className="flex gap-4">
                  <p className="text-gray-700 mt-1">Size: {prod.size}</p>
                  <p className="text-gray-700 mt-1">Color: {prod.color}</p>
                  <p className="text-gray-700 mt-1">Qty: {prod.quantity}</p>
                </div>

                <StarRating
                  orderId={props.order._id}
                  productId={prod.productname._id}
                  rated={prod.rated}
                />
              </div>

              <div className="ml-auto py-2 px-4 font-semibold">
                &#8369;{prod.productname.price}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-6 py-3 bg-gray-100">
        <h3 className="text-gray-900 font-bold">
          Total: &#8369;{props.order.total}
        </h3>
        <Link
          to={`${props.order._id}`}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          View Receipt
        </Link>
      </div>
    </div>
  );
};

export default TransactionCard;
