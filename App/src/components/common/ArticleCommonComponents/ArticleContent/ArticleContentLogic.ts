import { current } from "@reduxjs/toolkit";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useCallback, useEffect, useRef, useState } from "react";

interface IArticleContentLogic {
  posts: PostViewModel[];
}

const ArticleContentLogic = ({ posts }: IArticleContentLogic) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<PostViewModel[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const refContainer = useRef<HTMLDivElement>(null);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  const calculateContainerHeight = useCallback(() => {
    if (refContainer.current) {
      setItemsPerPage(Math.floor(refContainer.current.offsetHeight / 60));
    }
  }, [refContainer]);

  useEffect(() => {
    if (refContainer) {
      calculateContainerHeight();
    }
  }, [calculateContainerHeight]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  return { handlePageClick, pageCount, currentItems, refContainer };
};

export default ArticleContentLogic;
