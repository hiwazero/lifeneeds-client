import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { getToken } from "../../url/token";

const AdminSideNav = () => {
  const [isManageClicked, setIsManageClicked] = useState(false);
  const isManageHandler = () => {
    setIsManageClicked((prev) => !prev);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.status === 200) {
        sessionStorage.removeItem("accessToken");
        window.location.href = "../login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen w-screen">
      <header className="bg-gray-800 top-0 sticky w-full z-20">
        <div className="font-bold text-blue-500 text-2xl p-5">
          Admin<span className="text-orange-400">Panel</span>
        </div>
      </header>
      <main className="h-screen p-[3%] z-10 flex gap-10">
        <nav className="h-full w-[20%]">
          <div className="bg-gray-800 rounded-xl shadow-lg mb-6 px-6 py-4">
            <Link
              to={"./"}
              className="flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
            >
              <span className="material-icons-outlined float-left pr-2">
                dashboard
              </span>
              Dashboard
              <span className="material-icons-outlined float-right">
                keyboard_arrow_right
              </span>
            </Link>
            <div
              className="cursor-pointer flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
              onClick={isManageHandler}
            >
              <span className="material-icons-outlined float-left pr-2">
                tune
              </span>
              Manage
              <span className="material-icons-outlined float-right">
                keyboard_arrow_down
              </span>
            </div>
            {isManageClicked && (
              <div>
                <Link
                  to={"products"}
                  className="flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
                >
                  <span className="material-symbols-outlined float-left pr-2">
                    inventory_2
                  </span>
                  Products
                </Link>
                <Link
                  to={"orders"}
                  className="flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
                >
                  <span className="material-symbols-outlined float-left pr-2">
                    sell
                  </span>
                  Orders
                </Link>

                <Link
                  to={`blogs`}
                  className="flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
                >
                  <span className="material-symbols-outlined float-left pr-2">
                    edit_square
                  </span>
                  Blogs
                </Link>
                <Link
                  to={`users`}
                  className="flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
                >
                  <span className="material-symbols-outlined float-left pr-2">
                    group
                  </span>
                  Users
                </Link>
              </div>
            )}
            <Link
              to={"../shop"}
              className="cursor-pointer flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>{" "}
              E-commerce Store
            </Link>
            <div
              className="cursor-pointer flex text-gray-100 hover:bg-gray-700 rounded-lg p-1 my-4 w-full"
              onClick={logoutHandler}
            >
              <span className="material-icons-outlined float-left pr-2">
                power_settings_new
              </span>
              Log out
              <span className="material-icons-outlined float-right">
                keyboard_arrow_right
              </span>
            </div>
          </div>
        </nav>

        <div className="bg-white w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminSideNav;
