import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../../url/token";
import ListSkeleton from "../skeleton/ListSkeleton";
import { Card } from "flowbite-react";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/pending`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setOrders(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [isClicked]);

  const onConfirmHandler = async (id) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/confirm/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    if (res.status === 200) {
      setIsClicked(!isClicked);
    }
  };

  return (
    <>
      <div className="m-5 flex flex-col">
        <div className="-my-2 overflow-x-auto overflow-y-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {isLoading ? (
                <ListSkeleton />
              ) : orders.length === 0 ? (
                <Card>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>No orders yet!</p>
                  </h5>
                </Card>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th scope="col" className="relative px-6 py-3  text-xs">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {order._id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer.firstname} {order.customer.lastname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.total}
                          </td>

                          <td className="cursor-pointer px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <span
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                              onClick={() => onConfirmHandler(order._id)}
                            >
                              Confirm
                            </span>
                            <span
                              className="mx-5 text-indigo-600 hover:text-indigo-900"
                              onClick={() => onRejectHandler(order._id)}
                            >
                              Reject
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrder;
