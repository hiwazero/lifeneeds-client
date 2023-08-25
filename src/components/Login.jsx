import Logo from "../assets/logo-white.png";
import BackgroundImg from "../assets/background-img.jpg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { getToken } from "../url/token";

const Login = () => {
  const [loginData, setLoginData] = useState();
  const [showAlert, setShowAlert] = useState(undefined);

  if (getToken() !== null) {
    window.location.href = "./shop";
  }

  const backgroundStyle = {
    backgroundImage: `url(${BackgroundImg})`,
  };

  const onChangeLogin = (e) => {
    const { id, value } = e.target;

    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        loginData
      );

      if (res.status === 200) {
        sessionStorage.setItem("accessToken", res.data.token);
        window.location.href = "./shop";
      }
    } catch (error) {
      if (error.response.status === 400) {
        setShowAlert(true);
      }
    }
  };

  return (
    <>
      <div
        className="flex h-screen w-screen items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={backgroundStyle}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src={Logo} width="150" alt="life needs logo" />
              <h1 className="mb-2 text-3xl font-oswald">LifeNeeds Apparel</h1>
              <span className="text-gray-200 mb-2">Enter Login Details</span>
              {showAlert && (
                <Alert
                  message={!showAlert ? `123` : `Invalid username or password`}
                  alert={!showAlert}
                />
              )}
            </div>
            <form onSubmit={loginHandler}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md w-[100%]"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="id@email.com"
                  onChange={onChangeLogin}
                  required
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md w-[100%]"
                  type="Password"
                  name="password"
                  id="password"
                  placeholder="*********"
                  onChange={onChangeLogin}
                  required
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-gray-800 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-black"
                >
                  Login
                </button>
              </div>

              <div className="mt-4">
                <hr className="text-gray-200"></hr>
                <div className="mt-4 flex flex-col items-center">
                  <Link
                    to={`../register`}
                    className="text-gray-200 text-base hover:text-black"
                  >
                    Create Account
                  </Link>
                  <Link
                    to={"../home"}
                    className="text-gray-200 text-base hover:text-black"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
