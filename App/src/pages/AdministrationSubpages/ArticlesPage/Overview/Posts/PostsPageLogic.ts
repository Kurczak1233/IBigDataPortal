import { getAllPosts } from "api/PostsClient";
import { compareAsc } from "date-fns";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useEffect, useState } from "react";

const PostsPageLogic = () => {
  const [posts, setPosts] = useState<PostViewModel[]>();
  const handleGetAllPosts = async () => {
    const result = await getAllPosts();
    setPosts(
      result.sort((item, secondItem) =>
        compareAsc(new Date(secondItem.posted), new Date(item.posted))
      )
    );
  };
  useEffect(() => {
    if (!posts) {
      handleGetAllPosts();
    }
  }, [posts]);
  return { posts, setPosts };
};
export default PostsPageLogic;
