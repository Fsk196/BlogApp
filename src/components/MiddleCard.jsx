import React from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { Link } from "react-router-dom";
import { GoHeart, GoPaperAirplane } from "react-icons/go";

const MiddleCard = () => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Title of the Blog
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et beatae
          exercitationem obcaecati ad quisquam culpa, dolorum doloremque debitis
          accusantium ea?
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white flex gap-4"
          >
            <span className="flex items-center gap-1">
              <GoHeart className="text-3xl cursor-pointer" />{" "}
              <span className="text-lg text-gray-500">0</span>
            </span>
            <GoPaperAirplane className="text-3xl cursor-pointer" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default MiddleCard;
