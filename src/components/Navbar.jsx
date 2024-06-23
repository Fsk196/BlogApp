import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { signOutAccount } from "../lib/api";
import { Input } from "./ui/Input";
import { Select, SelectTrigger, SelectValue } from "./ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@radix-ui/react-select";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const [isNav, setIsNav] = useState(false);

  const handleLogout = async () => {
    try {
      // Delete sessions and handle logout
      await signOutAccount();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    const mobNav = document.getElementById("mobNav");
    setIsNav(!isNav);
    if (!isNav) {
      mobNav.classList.add("block");
      mobNav.classList.remove("hidden");
    } else {
      mobNav.classList.add("hidden");
      mobNav.classList.remove("block");
    }
  };

  const handleCloseMenu = () => {
    const mobNav = document.getElementById("mobNav");
    setIsNav(false);
    mobNav.classList.add("hidden");
    mobNav.classList.remove("block");
  };

  return (
    <div className="container w-full mx-auto h-20 flex justify-between items-center shadow-lg rounded-md">
      <div className="hidden md:flex justify-between w-full items-center">
        <div className="">
          <Link to="/">
            <h2 className="text-xl font-bold">VBlog</h2>
          </Link>
        </div>
        <div className="mx-2">
          <Link to="/">
            <Input
              type="text"
              className="bg-transparent sm:w-96 w-48"
              placeholder="Search Blogs"
            />
          </Link>
        </div>
        <div className="hidden md:block">
          <Menu className="">
            <Link to="/">
              <MenuItem setActive={setActive} active={active} item="Home" />
            </Link>
            <Link to="/create-blog">
              <MenuItem
                setActive={setActive}
                active={active}
                item="Create Blog"
              />
            </Link>
            <Link to="/about">
              <MenuItem setActive={setActive} active={active} item="About" />
            </Link>
            <Link to="/contact">
              <MenuItem setActive={setActive} active={active} item="Contact" />
            </Link>
            <button
              id="logout-btn"
              className="bg-red-600 hover:bg-red-600/90 shadow-md shadow-red-600 px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              <MenuItem setActive={setActive} active={active} item="Logout" />
            </button>
          </Menu>
        </div>
      </div>

      <div className="relative container w-full mx-auto h-20 flex justify-between items-center shadow-lg rounded-md md:hidden">
        <div className="">
          <Link to="/">
            <h2 className="text-xl font-bold">VBlog</h2>
          </Link>
        </div>
        <div className="mx-2">
          <Input
            type="text"
            className="bg-transparent sm:w-96 w-48"
            placeholder="Search Blogs"
          />
        </div>
        <div className="">
          <button className="flex items-center" onClick={handleClick}>
            {isNav ? (
              <HiX className="text-xl" />
            ) : (
              <HiOutlineMenu className="text-xl" />
            )}
          </button>
          <div id="mobNav" className="z-50 hidden">
            <div className="absolute w-40 rounded-lg  h-80 bg-black transition-all duration-100 right-0 top-20  drop-shadow-lg z-50 flex justify-center items-start px-4 flex-col text-lg gap-4 border">
              <Link to="/" onClick={handleCloseMenu}>
                Home
              </Link>
              <Link to="/create-blog" onClick={handleCloseMenu}>
                Create Blog
              </Link>
              <Link to="/about" onClick={handleCloseMenu}>
                About
              </Link>
              <Link to="/contact" onClick={handleCloseMenu}>
                Contact
              </Link>
              <button
                id="logout-btn"
                className="bg-red-600 hover:bg-red-600/90 shadow-sm shadow-red-600 px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
