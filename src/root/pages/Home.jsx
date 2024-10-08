import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getFilePreview, getPosts, getUserById } from "../../lib/appDataConf";
import { addPosts } from "../../features/actions/post";
import { getCurrentUser } from "../../lib/api";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

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
        const user = await getCurrentUser();
        if (!user) {
          throw new Error("User is not authenticated");
        }

        const fetchedPosts = await getPosts(page);
        if (Array.isArray(fetchedPosts)) {
          const articlesWithUser = await Promise.all(
            fetchedPosts.map(async (article) => {
              const [user, fileUrl] = await Promise.all([
                getUserById(article.userId),
                article.image ? getFilePreview(article.image) : null,
              ]);
              return { ...article, user, fileUrl };
            })
          );

          // filter out the duplicates posts
          const uniqueArticles = articlesWithUser.filter(
            (article) =>
              !posts.some((existingPost) => existingPost.$id === article.$id)
          );

          dispatch(addPosts(uniqueArticles));
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
  }, [page, dispatch]);

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
    <div className="w-full min-h-screen h-full flex flex-col z-0">
      <div className="w-full container mx-auto h-24 flex justify-start mr-20 items-center gap-3">
        <Select>
          <SelectTrigger className="w-[100px]" isIcon="true">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Blog</SelectLabel>
              <SelectItem value="apple">All Blogs</SelectItem>
              <SelectItem value="banana">Today</SelectItem>
              <SelectItem value="blueberry">Montly</SelectItem>
              <SelectItem value="grapes">Yearly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full min-h-screen h-full flex flex-col justify-start gap-2 items-center container mx-auto">
        <div className="flex justify-center items-center h-full flex-wrap gap-4">
          {posts.map((post, index) => (
            <MiddleCard
              key={post?.$id} // Assuming post has a unique identifier like $id
              title={post.title}
              name={post.user ? post.user.name : "Unknown"}
              subtitle={post.subtitle}
              image={post.fileUrl}
              category={post.category}
              date={post.date}
              ref={posts.length === index + 1 ? lastPostElementRef : null} // Attach ref to the last post element
            />
          ))}
        </div>
        {loading && (
          <div className="flex items-center gap-4 h-screen">
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
