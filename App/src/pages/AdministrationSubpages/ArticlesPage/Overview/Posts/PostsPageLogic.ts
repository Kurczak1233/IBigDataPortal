import { getAllPosts } from "api/PostsClient";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useEffect, useState } from "react";

const PostsPageLogic = () => {
  const [posts, setPosts] = useState<PostViewModel[]>();
  const handleGetAllPosts = async () => {
    setPosts(await getAllPosts());
  };
  useEffect(() => {
    if (!posts) {
      handleGetAllPosts();
    }
  }, [posts]);
  return { posts, setPosts };
};
export default PostsPageLogic;
