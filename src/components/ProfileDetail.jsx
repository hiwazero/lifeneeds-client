import { useState, useEffect } from "react";
import { getToken } from "../url/token";
import axios from "axios";

const ProfileDetail = () => {
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
      <div className="flex flex-col gap-5">
        <p className="font-roboto text-4xl">Profile</p>
        <span className="font-roboto">First Name:</span>
        <p className="font-worksans text-xl">{userProfile.firstname}</p>
        <span className="font-roboto">Middle Name:</span>
        <p className="font-worksans text-xl">{userProfile.middlename}</p>
        <span className="font-roboto">Last Name:</span>
        <p className="font-worksans text-xl">{userProfile.lastname}</p>
        <span className="font-roboto">Age:</span>
        <p className="font-worksans text-xl">{userProfile.age}</p>
        <span className="font-roboto">Address:</span>
        <p className="font-worksans text-xl">{userProfile.address}</p>
        <span className="font-roboto">Email:</span>
        <p className="font-worksans text-xl">{userProfile.email}</p>
      </div>
    </>
  );
};

export default ProfileDetail;
