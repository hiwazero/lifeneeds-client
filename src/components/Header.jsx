import { useEffect, useState } from "react";
import Logo from "../assets/logo-white.png";
import Cover from "../assets/cover/cover.png";
import { Link } from "react-router-dom";
import { getToken } from "../url/token";
import axios from "axios";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [token, setToken] = useState(undefined);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const access = sessionStorage.getItem("accessToken");
    if (access) {
      setToken(access);
    }

    const getProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setUserProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  const showNavHandler = () => {
    setShowNav(!showNav);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        sessionStorage.removeItem("accessToken");
        setToken(undefined);
        window.location.href = "../login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderNav = () => {
    if (showNav) {
      return (
        <nav
          className={`min-h-screen px-4 py-10 text-center bg-black md:hidden w3-animate-right`}
        >
          <nav className="flex flex-col items-center mt-10 space-y-2">
            {token && (
              <>
                <Link
                  to={"profile"}
                  className="flex py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
                  onClick={showNavHandler}
                >
                  Profile
                </Link>
              </>
            )}

            <Link
              to={"shop"}
              title=""
              className="flex py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
              onClick={showNavHandler}
            >
              Shop{" "}
            </Link>

            {token && (
              <Link
                to={"cart"}
                className="flex py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
                onClick={showNavHandler}
              >
                Cart
              </Link>
            )}

            <Link
              to={"blog"}
              title=""
              className="py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
              onClick={showNavHandler}
            >
              {" "}
              Blog{" "}
            </Link>

            {!token && (
              <Link
                to={"register"}
                title=""
                className="py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
                onClick={showNavHandler}
              >
                {" "}
                Register{" "}
              </Link>
            )}

            {token ? (
              <div
                title=""
                className="py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
                onClick={logoutHandler}
              >
                {" "}
                Logout{" "}
              </div>
            ) : (
              <Link
                to={"login"}
                title=""
                className="py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
                onClick={showNavHandler}
              >
                {" "}
                Login{" "}
              </Link>
            )}
          </nav>
        </nav>
      );
    }
  };

  return (
    <>
      <header className="bg-black border-b border-black sticky top-0 z-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-24">
            <div className="flex-shrink-0 items-center">
              <Link to={"/"} title="" className="flex">
                <img src={Cover} className="w-auto h-8 lg:h-20" />
                <img className="w-auto h-8 lg:h-20" src={Logo} alt="" />
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex p-2 text-white transition-all duration-200 rounded-md md:hidden focus:bg-gray-800 hover:bg-gray-800"
              onClick={showNavHandler}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <div className="hidden md:flex md:items-center md:space-x-10">
              {token && (
                <Link
                  to={"profile"}
                  title=""
                  className="flex text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"
                >
                  <img
                    src={`/src/assets/avatars/${userProfile.avatar}`}
                    alt=""
                    className="flex-none w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  ></img>
                </Link>
              )}

              {token && userProfile.role === "admin" && (
                <Link
                  to={"admin"}
                  className="flex py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
                >
                  <span className="material-symbols-outlined px-2">
                    admin_panel_settings
                  </span>
                  Admin
                </Link>
              )}

              <Link
                to={"shop"}
                title=""
                className="flex text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"
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
                Shop{" "}
              </Link>

              {token && (
                <Link
                  to={"cart"}
                  className="flex py-2 font-medium text-white transition-all duration-200 focus:text-opacity-70"
                >
                  Cart
                </Link>
              )}

              <Link
                to={"blog"}
                title=""
                className="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"
              >
                {" "}
                Blog{" "}
              </Link>

              {!token ? (
                <>
                  {" "}
                  <Link
                    to={"about"}
                    title=""
                    className="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"
                  >
                    {" "}
                    About Us{" "}
                  </Link>
                  <div className="sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to={"register"}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-sm"
                      >
                        Register
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to={"login"}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:text-sm"
                      >
                        Log in
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  title=""
                  className="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"
                  onClick={logoutHandler}
                >
                  {" "}
                  Logout
                </div>
              )}
            </div>
          </nav>

          {renderNav()}
        </div>
      </header>
    </>
  );
};

export default Header;
