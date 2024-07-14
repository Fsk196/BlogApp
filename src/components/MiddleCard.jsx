import React from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { Link } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { getNameInitials } from "../lib/api";
import CoypUrl from "../components/CopyUrl";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const MiddleCard = ({ title, name, date, image, subtitle, category }) => {
  const slug = generateSlug(title);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
        <CardItem className="w-full my-2 flex justify-between items-center flex-shrink-0 ">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={getNameInitials(name)}
              alt="user Profile"
              className="w-10 h-10 rounded-full border-2 border-red-600"
            />
            <p>{name}</p>
          </Link>
          <p className="text-sm text-gray-400">{formatDate(date)}</p>
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Link to={`/blog/${slug}`}>
            <img
              src={image}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </Link>
        </CardItem>
        <div className="flex flex-col flex-shrink-0 w-full h-40">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-red-500 my-2"
          >
            <Link to={`/blog/${slug}`}>{title}</Link>
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {subtitle}
          </CardItem>
        </div>

        <div className="flex justify-between items-center mt-10">
          <p className="text-sm text-slate-400">
            Category: <span className="text-red-500">{category}</span>
          </p>
          <CardItem
            translateZ="20"
            className="px-4 py-2 rounded-xl text-xs font-normal  dark:text-white flex gap-4 items-center"
          >
            <span className="flex items-center gap-1">
              <GoHeart className="text-2xl cursor-pointer" />
              <span className="text-lg text-gray-500">0</span>
            </span>

            <CoypUrl slug={slug} />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default MiddleCard;
