import { getCurrentUser, getInitials } from "../../lib/api";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({});

  const fetchUser = async () => {
    try {
      return await getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser().then((currentUser) => {
      setUserData(currentUser);
    });
  }, []);

  return (
    <div className="min-h-screen w-full container mx-aut flex justify-center">
      <div className="flex justify-center gap-10 items-center w-[40rem]">
        <img
          src={getInitials(userData.name)}
          alt="profile image"
          className="sm:w-40 sm:h-40 w-32 h-32 rounded-full"
        />
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl text-red-600 font-medium">{userData.name}</h1>
          <p className="text-slate-400">{userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
