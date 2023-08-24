import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../url/token";
import { Avatar } from "flowbite-react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
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

  return (
    <>
      <div className="h-screen w-full flex flex-col md:flex-row gap-5 my-5">
        <aside className="w-full md:w-[30%] h-[30%] flex flex-col justify-center md:h-full">
          <div className="ml-0 md:ml-[10%] flex justify-center items-center md:h-[20%]">
            <Avatar
              img={`/src/assets/avatars/${userProfile.avatar}`}
              size="lg"
              rounded
            >
              <div className="space-y-1 font-semibold dark:text-white">
                <div>{`${userProfile.firstname} ${userProfile.lastname}`}</div>
                <Link
                  to={`edit`}
                  className="text-sm text-gray-500 flex gap-2 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span className="text-gray-500">Edit Profile</span>
                </Link>
              </div>
            </Avatar>
          </div>
          <div className="ml-0 md:ml-[10%] md:h-[80%] py-5 flex md:flex-col gap-5">
            <div className="font-medium flex justify-center items-center py-3">
              <span className="material-symbols-outlined text-3xl mx-2">
                person
              </span>
              <Link to={``} className="font-semibold text-lg">
                My Account
              </Link>
            </div>
            <div className="font-medium flex justify-center items-center py-3">
              <span className="material-symbols-outlined text-3xl mx-2">
                wallet
              </span>
              <Link to={`transaction`} className="font-semibold text-lg">
                My Purchase
              </Link>
            </div>
          </div>
        </aside>
        <section className="w-full md:w-[70%] max-h-full p-5 overflow-y-auto md:overflow-visible p-6 bg-white border rounded-lg shadow-lg">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Profile;
