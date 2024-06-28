import React from "react";

const BlogDetail = () => {
  const blogData = {
    title: "Blog No 1",
    image:
      "https://natureinmind.ie/wp-content/uploads/2019/05/IMG_0242-600x400.jpg",
    subtitle:
      "The absence of a deep emotional connection between humans and the natural world is at the root of the environmental crisis. Can you think of a place in nature that you know really well?",
    category: "Nature",
    date: "24-12-2024",
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{blogData.title}</h1>
      <img src={blogData.image} alt="image" />
      <p className="mt-4">{blogData.subtitle}</p>
      <p className="mt-2 text-sm text-slate-400">
        Category: <span className="text-red-500">{blogData.category}</span>
      </p>
      <p>{blogData.date}</p>
    </div>
  );
};

export default BlogDetail;
