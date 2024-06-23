import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store.js";
import "./index.css";
import Login from "./auth/forms/Login.jsx";

import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./root/pages/Home.jsx";
import AuthLayout from "./auth/AuthLayout.jsx";
import RootLayout from "./root/RootLayout.jsx";
import Blog from "./root/pages/Blog.jsx";
import About from "./root/pages/About.jsx";
import Contact from "./root/pages/Contact.jsx";
import SignUp from "./auth/forms/SignUp.jsx";
import { login } from "./features/auth/authSlice.js";
import { account } from "./lib/appwrite.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Route */}
      <Route element={<AuthLayout isPrivate={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      {/* Private Route */}
      <Route element={<AuthLayout isPrivate={true} />}>
        <Route element={<RootLayout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/create-blog" element={<Blog />} />
          <Route index path="/about" element={<About />} />
          <Route index path="/contact" element={<Contact />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="bg-black text-white">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>
);
