import axios from "axios";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { getToken } from "../../url/token";

const AdminDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dashboard, setDashboard] = useState({});
  const isDataFetched = useRef(false);

  // useEffect(() => {
  //   // Update the currentDateTime every second
  //   const intervalId = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000); // 1000 milliseconds = 1 second

  //   return () => {
  //     clearInterval(intervalId); // Clear the interval when the component unmounts
  //   };
  // }, []);

  useEffect(() => {
    // Fetch data only if it hasn't been fetched before
    if (!isDataFetched.current) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/dashboard`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
          setDashboard(res.data);
          isDataFetched.current = true; // Mark data as fetched
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      <div className="bg-gray-900 pt-3">
        <div className="flex justify-around rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
          <div className="flex">
            <h1 className="font-bold pl-2">Welcome,</h1>
            <strong> Butch Ryan!</strong>
          </div>
          {/* <span className="text-xl text-white  px-8">
            <strong>
              {moment(currentDateTime).format("MMMM Do YYYY, h:mm:ss a")}
            </strong>
          </span> */}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-green-600">
                  <i className="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Revenue
                </h2>
                <p className="font-bold text-3xl">
                  &#x20B1;{dashboard.totalSum && dashboard.totalSum.toFixed(2)}
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-pink-600">
                  <i className="fas fa-users fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Users
                </h2>
                <p className="font-bold text-3xl">
                  {dashboard.totalUsers}
                  <span className="text-pink-500">
                    <i className="fas fa-exchange-alt"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-yellow-600">
                  <i className="fa-solid fa-bag-shopping fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">Products</h2>
                <p className="font-bold text-3xl">
                  {dashboard.totalProducts}
                  <span className="text-yellow-600">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-indigo-600">
                  <i className="fas fa-tasks fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Pending List
                </h2>
                <p className="font-bold text-3xl">
                  {dashboard.totalPending} Orders
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-blue-600">
                  <i className="fas fa-server fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Succesful Orders
                </h2>
                <p className="font-bold text-3xl">
                  {dashboard.totalSuccessful} orders
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
          <div className="bg-gradient-to-b from-violet-200 to-violet-100 border-b-4 border-violet-500 rounded-lg shadow-xl p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-violet-600">
                  <i className="fas fa-inbox fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h2 className="font-bold uppercase text-gray-600">
                  Total Orders
                </h2>
                <p className="font-bold text-3xl">
                  {dashboard.totalOrders}
                  <span className="text-violet-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
