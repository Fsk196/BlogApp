import {
  getCurrentUsersPost,
  getFilePreview,
  getUserById,
} from "../../lib/appDataConf";
import { getCurrentUser, getInitials } from "../../lib/api";
import React, { useEffect, useState } from "react";
import MyPosts from "../../components/MyPosts";

const Profile = React.memo(() => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const fetchUser = async () => {
    try {
      return await getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchedPosts = async () => {
    try {
      const userId = await getCurrentUser();
      const usersPost = await getCurrentUsersPost(userId.$id);
      if (Array.isArray(usersPost)) {
        const articlesWithUser = await Promise.all(
          usersPost.map(async (article) => {
            const [user, fileUrl] = await Promise.all([
              getUserById(article.userId),
              article.image ? getFilePreview(article.image) : null,
            ]);
            console.log("Article ", article);
            console.log("User ", user);
            console.log("FileUrl ", fileUrl);

            return { ...article, user, fileUrl };
          })
        );
        return articlesWithUser;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedPosts().then((articlesWithUser) => {
      setUserPosts(articlesWithUser);
    });
  }, []);

  useEffect(() => {
    fetchUser().then((currentUser) => {
      setUserData(currentUser);
    });
    // console.log(userData.name);
  }, []);

  return (
    <div className="min-h-screen w-full container mx-auto flex justify- items-center flex-col">
      <div className="flex justify-center gap-10 items-center w-full mt-4">
        {userData ? (
          <>
            <img
              src={getInitials(userData)}
              alt="profile image"
              className="sm:w-40 sm:h-40 w-32 h-32 rounded-full"
            />
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl text-red-600 font-medium">
                {userData.name}
              </h1>
              <p>{userData.email}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="border-b-2 w-full my-3 border-red-600"></div>
      <div>
        <h2 className="text-2xl text-red-600 font-semibold text-center">
          My Posts
        </h2>
        {userPosts ? (
          <div className="flex justify-center items-center h-full flex-wrap gap-4">
            {userPosts.length > 0 ? (
              userPosts.map((post, index) => (
                <MyPosts
                  key={post?.$id}
                  title={post.title}
                  name={post.user ? post.user.name : "Unknown"}
                  subtitle={post.subtitle}
                  image={post.fileUrl}
                  category={post.category}
                  date={post.date}
                  // ref={post.length === index + 1 ? lastPostElementRef : null}
                />
              ))
            ) : (
              <p>
                <div className="flex items-center gap-4 h-screen">
                  Loading
                  <div className="w-8 h-8 border-r-4 border-r-red-600 border-white/30 rounded-full animate-spin"></div>
                </div>
              </p>
            )}
          </div>
        ) : (
          <>
            <div>
              <p>No Post available</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default Profile;
