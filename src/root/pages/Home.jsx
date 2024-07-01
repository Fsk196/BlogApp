import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MiddleCard from "../../components/MiddleCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { getFileView, getPosts, getUserById } from "../../lib/appDataConf";

const Home = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Page state for infinite scrolling
  const [page, setPage] = useState(1);
  // To check if there are more posts to load
  const [hasMore, setHasMore] = useState(true);

  // const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await getPosts();
        if (Array.isArray(fetchedPosts)) {
          const articlesWithUser = await Promise.all(
            fetchedPosts.map(async (article) => {
              const user = await getUserById(article.userId);

              let imageUrl = null;
              if (article.uploadImage && article.uploadImage.$id) {
                try {
                  imageUrl = await getFileView(article.uploadImage.$id); // Use the appropriate method here
                } catch (err) {
                  console.error(
                    `Error fetching image for post ${article.$id}:`,
                    err
                  );
                }
              }

              console.log(
                `Fetched image URL for post ${article.$id}:`,
                imageUrl
              );

              // Fetching image URL from appwrite storage
              // const imageUrl = article.uploadImage
              //   ? await getFileView(article.uploadImage.$id)
              //   : null;
              // console.log(imageUrl);
              return { ...article, user, imageUrl };
            })
          );
          setPosts((prevPosts) => {
            const newPosts = articlesWithUser.filter(
              (post) => !prevPosts.some((p) => p.$id === post.$id)
            );
            return [...prevPosts, ...newPosts];
          });
          setHasMore(fetchedPosts.length > 0); // Check if there are more posts to load
        } else {
          console.error("Fetched posts is not an array:", fetchedPosts);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (!Array.isArray(posts)) {
    return <div>Error: Posts data is not in the expected format.</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 items-center container mx-auto">
      <div className="w-full container mx-auto h-24 flex justify-start mr-20 items-center gap-3">
        <Select>
          <SelectTrigger className="w-[100px]" isIcon="true">
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
        {posts.map((post, index) => (
          <MiddleCard
            key={post.$id} // Assuming post has a unique identifier like $id
            title={post.title}
            name={post.user ? post.user.name : "Unknown"}
            subtitle={post.subtitle}
            image={post.imageUrl}
            category={post.category}
            date={post.date}
            ref={posts.length === index + 1 ? lastPostElementRef : null} // Attach ref to the last post element
          />
        ))}
        {loading && (
          <div className="flex items-center gap-4">
            Loading
            <div className="w-8 h-8 border-r-4 border-r-red-600 border-white/30 rounded-full animate-spin"></div>
          </div>
        )}
        {!hasMore && <div>No more posts</div>}
      </div>
    </div>
  );
};

export default Home;
