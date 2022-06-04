import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IArticleContentLogic {
  posts: PostViewModel[];
}

const ArticleContentLogic = ({ posts }: IArticleContentLogic) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<PostViewModel[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const navigate = useNavigate();
  const refContainer = useRef<HTMLDivElement>(null);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  const calculateContainerHeight = (item: HTMLDivElement) => {
    if (Math.floor(item.offsetHeight / 68)) {
      setItemsPerPage(Math.floor(item.offsetHeight / 68));
    }
  };

  const naviateToItemOverview = (postId: number) => {
    navigate(
      `/${administrationRoute}/${articlesRoute}/${postsRoute}/${postId}`
    );
  };

  useEffect(() => {
    if (refContainer.current !== null) {
      calculateContainerHeight(refContainer.current);
    }
  }, [refContainer]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  return {
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
    naviateToItemOverview,
  };
};

export default ArticleContentLogic;
