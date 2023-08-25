import { useState, useEffect } from "react";
import { getToken } from "../url/token";
import { Avatar, Button } from "flowbite-react";
import axios from "axios";

const ProfileEdit = () => {
  const [userProfile, setUserProfile] = useState({});
  const [editProfile, setEditProfile] = useState({});
  const [editTrigger, setEditTrigger] = useState({
    avatar: false,
    firstname: false,
    middlename: false,
    address: false,
    password: false,
  });

  const avatars = [
    "avatar_1.webp",
    "avatar_2.webp",
    "avatar_3.webp",
    "avatar_4.webp",
    "avatar_5.webp",
    "avatar_6.webp",
  ];

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

  const clickEditHandler = (value) => {
    setEditTrigger((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  const clickProfileHandler = (imagePath) => {
    setEditProfile((prev) => ({ ...prev, avatar: imagePath }));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
    console.log("working");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(editProfile);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me`,
        editProfile,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.status === 200) {
        window.location.href = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-full overflow-y-auto">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-10 overflow-y-auto p-6 bg-white"
        >
          <p className="font-roboto text-4xl">Edit Profile</p>

          <div>
            <div className="flex gap-2 cursor-pointer">
              <label htmlFor="" className="font-roboto">
                Avatar
              </label>
              <p
                className="flex text-gray-500"
                onClick={() => clickEditHandler("avatar")}
              >
                {" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>{" "}
                Edit
              </p>
            </div>

            {editTrigger.avatar === true ? (
              <div className="flex flex-col">
                <div className="h-50 flex flex-col md:justify-center md:flex-row gap-5 overflow-x-auto">
                  {avatars.map((avatar, index) => (
                    <li
                      key={index}
                      onClick={() => clickProfileHandler(avatar)}
                      className="list-none"
                    >
                      <Avatar
                        color={`${
                          editProfile.avatar === avatar ? `success` : ``
                        }`}
                        bordered={editProfile.avatar === avatar ? true : false}
                        className={`p-1 rounded-full`}
                        rounded
                        img={`/src/assets/avatars/${avatar}`}
                        placeholderInitials={"A"}
                        size="lg"
                      ></Avatar>
                    </li>
                  ))}
                </div>

                <div className="mt-5 flex justify-center gap-2">
                  <Button type="submit" color="success">
                    Save
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => clickEditHandler("avatar")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-5 w-[30%] md:w-[20%]">
                <Avatar
                  rounded
                  img={`/src/assets/avatars/${userProfile.avatar}`}
                  placeholderInitials={"A"}
                  size="lg"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex gap-2 cursor-pointer">
              <label htmlFor="" className="font-roboto">
                First Name
              </label>
              <p
                className="flex text-gray-500"
                onClick={() => clickEditHandler("firstname")}
              >
                {" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>{" "}
                Edit
              </p>
            </div>

            {editTrigger.firstname === true ? (
              <div className="">
                <input
                  type="text"
                  className="font-worksans text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="firstname"
                  placeholder={userProfile.firstname}
                  onChange={onChangeHandler}
                />
                <div className="mt-2 flex gap-2">
                  <Button type="submit" color="success">
                    Save
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => clickEditHandler("firstname")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="font-worksans text-xl">{userProfile.firstname}</p>
            )}
          </div>

          <div>
            <div className="flex gap-2 cursor-pointer">
              <label htmlFor="" className="font-roboto">
                Middle Name
              </label>
              <p
                className="flex text-gray-500"
                onClick={() => clickEditHandler("middlename")}
              >
                {" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>{" "}
                Edit
              </p>
            </div>

            {editTrigger.middlename === true ? (
              <div>
                <input
                  type="text"
                  className="font-worksans text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="middlename"
                  placeholder={userProfile.middlename}
                  onChange={onChangeHandler}
                />
                <div className="mt-2 flex gap-2">
                  <Button type="submit" color="success">
                    Save
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => clickEditHandler("middlename")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="font-worksans text-xl">{userProfile.middlename}</p>
            )}
          </div>

          <div>
            <div className="flex gap-2 cursor-pointer">
              <label htmlFor="" className="font-roboto">
                Last Name
              </label>
              <p
                className="flex text-gray-500"
                onClick={() => clickEditHandler("lastname")}
              >
                {" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>{" "}
                Edit
              </p>
            </div>

            {editTrigger.lastname === true ? (
              <div>
                <input
                  type="text"
                  className="font-worksans text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="lastname"
                  placeholder={userProfile.lastname}
                  onChange={onChangeHandler}
                />
                <div className="mt-2 flex gap-2">
                  <Button type="submit" color="success">
                    Save
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => clickEditHandler("lastname")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="font-worksans text-xl">{userProfile.lastname}</p>
            )}
          </div>

          <div>
            <div className="flex gap-2 cursor-pointer">
              <label htmlFor="" className="font-roboto">
                Address
              </label>
              <p
                className="flex text-gray-500"
                onClick={() => clickEditHandler("address")}
              >
                {" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>{" "}
                Edit
              </p>
            </div>

            {editTrigger.address === true ? (
              <div>
                <input
                  type="text"
                  className="font-worksans text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="address"
                  placeholder={userProfile.address}
                  onChange={onChangeHandler}
                />
                <div className="mt-2 flex gap-2">
                  <Button type="submit" color="success">
                    Save
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => clickEditHandler("address")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="font-worksans text-xl">{userProfile.address}</p>
            )}
          </div>

          <div>
            <div className="flex gap-2 cursor-pointer">
              <label htmlFor="" className="font-roboto">
                Password
              </label>
              <p
                className="flex text-gray-500"
                onClick={() => clickEditHandler("password")}
              >
                {" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>{" "}
                Edit
              </p>
            </div>

            {editTrigger.password === true ? (
              <>
                <div className="mt-5">
                  <label htmlFor="" className="font-roboto ">
                    Old Password
                  </label>
                  <input
                    type="text"
                    className="font-worksans text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    placeholder="********"
                  />

                  <div>
                    <label htmlFor="" className="font-roboto">
                      New Password
                    </label>
                    <input
                      type="text"
                      name="newpassword"
                      className="font-worksans text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="********"
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="font-roboto">
                      Confirm Password
                    </label>
                    <input
                      type="text"
                      name="repassword"
                      className="font-worksans text-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="********"
                    />
                  </div>
                </div>

                <div className="mt-2 flex gap-2">
                  <Button type="submit" color="success">
                    Save
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => clickEditHandler("password")}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEdit;
