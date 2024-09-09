import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { getInitials, signOutAccount } from "../lib/api";
import { Input } from "./ui/Input";
import { Select, SelectTrigger, SelectValue } from "./ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@radix-ui/react-select";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MdCreate } from "react-icons/md";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const [isNav, setIsNav] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

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
    <div className="w-full mx-auto  h-20 flex justify-between items-center shadow-lg rounded-md ">
      <div className="hidden md:flex justify-between w-full items-center fixed pl-20 pr-10 z-10 bg-black/70">
        <div className="">
          <Link to="/">
            {/* <h2 className="text-xl font-bold">VBlog</h2> */}
            <img
              src="src\assets\navlogo.png"
              width={70}
              height={20}
              alt="navlogo"
            />
          </Link>
        </div>
        <div className="mx-2">
          <Input
            type="text"
            className="bg-transparent sm:w-80 w-48"
            placeholder="Search Blogs"
          />
        </div>
        <div className="hidden md:block">
          <Menu className="">
            <Link to="/">
              <MenuItem setActive={setActive} active={active} item="Home" />
            </Link>
            <Link to="/create-blog">
              <MenuItem setActive={setActive} active={active} item="Create" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-14 text-lg rounded-lg font-normal bg-transparent hover:bg-transparent border-none outline-none  focus:outline-none focus:bg-transparent focus-visible:ring-offset-0 hover:text-white flex items-center gap-4"
                >
                  <img
                    src={getInitials(userData)}
                    alt="user profile"
                    className="w-10 h-10 rounded-full border-2 border-red-600 bg-white"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-transparent text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="">
                    <button
                      id="logout-btn"
                      className="bg-red-600 hover:shadow-md hover:shadow-red-500 shadow-sm px-4 py-2 rounded-lg"
                      onClick={handleLogout}
                    >
                      <MenuItem
                        setActive={setActive}
                        active={active}
                        item="Logout"
                      />
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Menu>
        </div>
      </div>

      {/* Mobile Navbar starts here */}

      <div className="relative container w-full mx-auto h-20 flex justify-between items-center shadow-lg rounded-md md:hidden z-10">
        <div className="">
          <Link to="/">
            <img
              src="src\assets\navlogo.png"
              width={70}
              height={20}
              alt="navlogo"
            />
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
          <div id="mobNav" className="hidden z-10 px-4">
            <div className="absolute w-[90%] rounded-lg h-80 bg-black transition-all duration-100 right-4 top-20  drop-shadow-lg z-10 flex justify-center items-start px-4 flex-col text-lg gap-4 border">
              <Link to="/" onClick={handleCloseMenu}>
                Home
              </Link>
              <Link to="/profile" onClick={handleCloseMenu}>
                Profile
              </Link>
              <Link to="/create-blog" onClick={handleCloseMenu}>
                Create Blog
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
