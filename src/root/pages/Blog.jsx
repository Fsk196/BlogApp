import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Switch } from "../../components/ui/switch";
import { LabelInputContainer } from "../../components/index";
import { getCurrentUser } from "../../lib/api";
import { useSelector } from "react-redux";
import { createPost } from "../../lib/appDataConf";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("deactive");
  const userData = useSelector((state) => state.auth.userData);
  const [image, setImage] = useState("");

  const date = new Date();
  const currentDate = `${date.getDate()}-${`0${date.getMonth() + 1}`.slice(
    -2
  )}-${date.getFullYear()}`;
  console.log(currentDate);

  console.log(userData.$id);

  const titleToSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // replace spaces with dashes
      .replace(/[^\w-]+/g, "") // remove non-word characters (everything except letters, numbers, and dashes)
      .replace(/--+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slug = titleToSlug(title);
      console.log(slug);
      const currentStatus =
        status === "deactive"
          ? document.getElementById("airplane-mode").checked
            ? "active"
            : "deactive"
          : status;
      await createPost({
        title,
        content,
        image,
        status: currentStatus,
        userId: userData.$id,
        date: currentDate,
        subtitle,
        slug: titleToSlug(title),
      });
      setTitle("");
      setSubtitle("");
      setContent("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen container mx-auto">
      <div className="w-full flex flex-col gap-4">
        <form onSubmit={handleSubmit}>
          <LabelInputContainer className=" flex-row items-center  space-x-7">
            <Label className="text-lg">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter you title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent sm:w-96 w-48"
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-full flex-row items-center  space-x-4">
            <Label className="text-lg">Subtitle</Label>
            <Input
              id="subtitle"
              type="text"
              placeholder="Enter you subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="bg-transparent sm:w-96 w-48"
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-full flex-row items-center  space-x-4">
            <Label className="text-lg">Content</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter you content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-transparent sm:w-96 w-48"
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-full flex-row items-center  space-x-4">
            <Label className="text-lg">Image</Label>
            {/* <Input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="bg-transparent sm:w-96 h-48 w-48"
            /> */}
            <Input
              id="image"
              type="text"
              onChange={(e) => setImage(e.target.value)}
              className="bg-transparent sm:w-96 h-48 w-48"
            />
          </LabelInputContainer>
          <div className="flex items-center space-x-2 my-2">
            <Label htmlFor="airplane-mode" className="text-xl">
              Status
            </Label>
            <Switch
              id="airplane-mode"
              className=""
              value={status}
              onChange={(e) =>
                setStatus(e.target.checked ? "active" : "deactive")
              }
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 px-4 py-2 text-white text-xl rounded-md mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
