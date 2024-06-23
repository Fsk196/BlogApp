import React from "react";
import { useSelector } from "react-redux";
import MiddleCard from "../../components/MiddleCard";
import BlogCard from "../../components/BlogCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const Home = () => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 items-center container mx-auto">
      <div className="w-full h-24 flex justify-end mr-20 items-center gap-3">
        <Select>
          <SelectTrigger className="w-[180px]" isIcon="true">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Blog</SelectLabel>
              <SelectItem value="apple">New Blog</SelectItem>
              <SelectItem value="banana">Today</SelectItem>
              <SelectItem value="blueberry">Montly</SelectItem>
              <SelectItem value="grapes">Yearly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <h2 className="text-2xl font-medium text-gray-300 z-10">
        Welcome to Brand new Blogging App
      </h2>
      <div className="flex justify-center items-center h-full my-10 flex-wrap gap-4">
        <MiddleCard />
        <MiddleCard />
        <MiddleCard />
        <MiddleCard />
        <MiddleCard />
        <MiddleCard />
        <MiddleCard /> 
      </div>
    </div>
  );
};

export default Home;
