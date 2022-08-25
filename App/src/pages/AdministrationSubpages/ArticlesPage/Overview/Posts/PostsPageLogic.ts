import { getAllPosts } from "api/PostsClient";
import { compareAsc } from "date-fns";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { initializePostsFilters } from "redux/slices/articlesFiltersSlice";

const PostsPageLogic = () => {
  const [posts, setPosts] = useState<PostViewModel[]>();
  const dispatch = useDispatch();

  const handleGetAllPosts = useCallback(async () => {
    const result = await getAllPosts();
    const sortingResult = result.sort((item, secondItem) =>
      compareAsc(new Date(secondItem.posted), new Date(item.posted))
    );
    setPosts(sortingResult);
    dispatch(initializePostsFilters(sortingResult));
  }, [dispatch]);
  useEffect(() => {
    if (!posts) {
      handleGetAllPosts();
    }
  }, [handleGetAllPosts, posts]);
  return { posts, setPosts };
};
export default PostsPageLogic;
