import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signOutAccount } from "../lib/api";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout is Clicked");
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        await signOutAccount();
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleLogout}>
  <MenuItem setActive={setActive} active={active} item="Logout" />
</button>
};

export default LogoutBtn;
