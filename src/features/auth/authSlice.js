import { createSlice } from "@reduxjs/toolkit";
import { setUserDataInLocalStorage } from "../../lib/api";

const getInitialState = () => {
  const userData = localStorage.getItem("userData");
  console.log("Retrieved userData from localStorage:", userData);
  try {
    return {
      status: !!userData, // Set to true if userData exists in local storage
      userData: userData ? JSON.parse(userData) : null,
    };
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
    return {
      status: false,
      userData: null,
    };
  }
};

const initialState = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      setUserDataInLocalStorage(action.payload.userData);
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
      localStorage.removeItem("userData"); // Remove userData from local storage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
