import { getFilePreview, getPost, getUserById } from "../../lib/appDataConf";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    getPost(slug).then((postData) => setPost(postData));
  }, [slug]);

  const imageId = post ? post.image : null;
  const userId = post ? post.userId : null;

  useEffect(() => {
    getUserById(userId).then((user) => setUser(user));
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatedDate = formatDate(post ? post.date : null);

  useEffect(() => {
    if (imageId) {
      getFilePreview(imageId).then((url) => setImageUrl(url));
    } else {
      setImageUrl(null);
    }
  }, [imageId]);

  if (!post) {
    return (
      <div className="flex items-center gap-4 h-screen">
        Loading
        <div className="w-8 h-8 border-r-4 border-r-red-600 border-white/30 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 w-full h-lvh">
      <div className="flex flex-col gap-4 mx-auto justify-center sm:w-[800px] w-full ">
        <h1 className="text-3xl font-medium text-red-600 text-center">
          {post.title}
        </h1>
        <div className="flex justify-center items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="post image"
              className="sm:w-[500px] sm:h-[400px] w-[300px] h-[280px] rounded drop-shadow-md"
            />
          ) : null}
        </div>
        <div className="my-2 flex flex-col justify-center items-center gap-10">
          <p className="text-lg text-slate-300 font-normal">
            <span className="text-red-600 font-medium">Subtitle:</span>{" "}
            {post.subtitle}
          </p>
          <p className="text-lg text-slate-300 font-normal">
            <span className="text-red-600 font-medium">Content:</span>{" "}
            {post.content}
          </p>
          <p className="text-lg text-slate-500 font-normal">
            <span className="text-red-500 font-medium">Date:</span>{" "}
            {formatedDate}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg text-slate-500 font-normal">
            <span className="text-red-500 font-medium mx-2">Category:</span>null
          </p>
          <p className="text-lg text-slate-500 font-normal">
            <span className="text-red-500 font-medium mx-2">Author:</span>
            {user ? user.name : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
