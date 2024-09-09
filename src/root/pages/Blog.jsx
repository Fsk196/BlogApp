import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Switch } from "../../components/ui/switch";
import { LabelInputContainer } from "../../components/index";
import { useSelector } from "react-redux";
import { createPost } from "../../lib/appDataConf";
import EditorComp from "../../components/EditorComp";

import { MdCloudUpload } from "react-icons/md";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [image, setImage] = useState(null);
  const [imagename, setImagename] = useState(null);
  const [filename, setFilename] = useState("No file selected");

  const date = new Date();
  const currentDate = `${date.getDate()}-${`0${date.getMonth() + 1}`.slice(
    -2
  )}-${date.getFullYear()}`;
  // console.log(currentDate);

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
      // console.log(slug);

      await createPost({
        title,
        content,
        image: image,
        status: status,
        userId: userData.$id,
        date: currentDate,
        subtitle,
        slug: titleToSlug(title),
      });
      setTitle("");
      setSubtitle("");
      setContent("");
      setImage(null);

      // Show success message;
      toast({
        title: "Post Created",
        description: "Your post has been successfully submitted.",
        status: "success",
        duration: 3000, // duration in ms
      });
    } catch (error) {
      console.log(error);

      // Show error message
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your post. Please try again.",
        status: "error",
        duration: 3000, // duration in ms
      });
    }
  };

  return (
    <div className="w-full min-h-svh container mx-auto flex flex-col justify-center">
      <h2 className="text-xl text-gray-400 text-center">
        Create your <span className="text-red-600">Blog</span> post
      </h2>
      <div className="w-full flex flex-col gap-4 justify-start pt-2 items-center">
        <form onSubmit={handleSubmit}>
          <LabelInputContainer className="flex-row items-center space-x-7">
            {/* <Label className="text-lg">Title</Label> */}
            <Input
              id="title"
              type="text"
              placeholder="Enter you title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent sm:w-96 w-64"
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-full flex-row items-center  space-x-4">
            {/* <Label className="text-lg">Subtitle</Label> */}
            <Input
              id="subtitle"
              type="text"
              placeholder="Enter you subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="bg-transparent sm:w-96 w-64"
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-full flex-row items-center  space-x-4">
            {/* <Label className="text-lg">Content</Label> */}
            <textarea
              id="title"
              type="text"
              placeholder="Enter you content"
              draggable="false"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-zinc-800 mt-[2px] mb-1 rounded-sm px-2 sm:w-96 w-64 h-36 text-white placeholder:text-neutral-400 dark:placeholder-text-neutral-600 pt-1 text-sm
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 "
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-full flex-row items-center rounded-sm space-x-3 flex border-dashed border-2 border-gray-700 cursor-pointer justify-center h-40">
            <form
              className="flex flex-row justify-center items-center w-full h-40"
              onClick={() => document.querySelector(".image-picker").click()}
            >
              <input
                id="image"
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log(file);

                  if (file) {
                    setImagename(URL.createObjectURL(file));
                    console.log(setImagename(URL.createObjectURL(file)));
                  }
                  setImage(file || null);
                  setFilename(e.target.files[0].name);
                }}
                className="image-picker sm:w-full h-40 "
              />

              {image ? (
                <img
                  src={imagename ? imagename : image}
                  width={120}
                  height={120}
                  alt={filename}
                />
              ) : (
                <>
                  <MdCloudUpload color="#525252" size={50} />
                  <p className="ml-1 text-sm text-gray-400 font-medium">
                    Browse Files to upload.
                  </p>
                </>
              )}
            </form>
          </LabelInputContainer>
          <div className="flex items-center space-x-2 my-2">
            <Label
              htmlFor="airplane-mode"
              className="text-lg font-normal dark:text-gray-400"
            >
              Status:
            </Label>
            <Switch
              id="airplane-mode"
              className="w-14 h-7 bg-gray-200"
              checked={status}
              onCheckedChange={(checked) => {
                setStatus(checked);
                console.log("Checked", checked);
              }}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-red-600 px-4 py-2 text-white text-lg rounded-md mt-4"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;
