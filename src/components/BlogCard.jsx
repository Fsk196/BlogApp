import React from "react";
import { GoHeart, GoPaperAirplane } from "react-icons/go";

const BlogCard = () => {
  const image =
    "https://plus.unsplash.com/premium_photo-1667680758355-b146e59de89a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="flex border rounded-md px-4 py-5 w-[900px] h-[250px] justify-evenly items-center">
      <div className="flex sm:flex-row flex-col">
        <div>
          <img
            src={image}
            className="w-80 rounded-md shadow-md"
            alt="blogimg"
          />
        </div>
        <div>
          <h2 className="text-2xl mb-2">Title of the Blog</h2>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et beatae
            exercitationem obcaecati ad quisquam culpa, dolorum doloremque
            debitis accusantium ea?
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <GoHeart className="text-3xl cursor-pointer" />
            <GoPaperAirplane className="text-3xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
