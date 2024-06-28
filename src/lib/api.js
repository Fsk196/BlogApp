import { ID, Query } from "appwrite";
import {
  account,
  databases,
  appwriteConfig,
  storage,
  avatars,
} from "./appwrite";
import { login, logout } from "../features/auth/authSlice";
import { store } from "../store/store";

export const createUserAccount = async (user) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newUser) throw Error;
    const userDb = await saveUserToDB(user);
    const session = await signInAccount(user);
    if (session) {
      const currentUser = await getCurrentUser();
      store.dispatch(login({ userData: currentUser, status: true }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInitials = (userData) => {
  try {
    return avatars.getInitials(userData.name);
  } catch (error) {
    console.log(error);
  }
};

export const setUserDataInLocalStorage = (userData) => {
  try {
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error stringifying userData for localStorage:", error);
  }
};

export const saveUserToDB = async (user) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        email: user.email,
        name: user.name,
        id: user.$id,
      }
    );
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const signInAccount = async (user) => {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    const accountDetails = await account.get();
    store.dispatch(login({ userData: accountDetails, status: true }));
    console.log(accountDetails);
    return session;
  } catch (error) {
    console.error("Error in signInAccount:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentSession = async () => {
  try {
    return await account.getSession("current");
  } catch (error) {
    console.log(error);
  }
};

export const signOutAccount = async () => {
  try {
    // Delete all sessions (assuming user is logged in)
    await account.deleteSessions();
    store.dispatch(logout());
  } catch (error) {
    console.log(error);
  }
};

