import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useEffect, useRef, useState } from "react";

interface IEduLinksItemsLogic {
  eduLinks: EduLinkViewModel[];
}

const EduLinksItemsLogic = ({ eduLinks }: IEduLinksItemsLogic) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<EduLinkViewModel[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const refContainer = useRef<HTMLDivElement>(null);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % eduLinks.length;
    setItemOffset(newOffset);
  };

  const calculateContainerHeight = (item: HTMLDivElement) => {
    if (Math.floor(item.offsetHeight / 68)) {
      setItemsPerPage(Math.floor(item.offsetHeight / 68));
    }
  };

  useEffect(() => {
    if (refContainer.current !== null) {
      calculateContainerHeight(refContainer.current);
    }
  }, [refContainer]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(eduLinks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(eduLinks.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, eduLinks]);

  return {
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
  };
};

export default EduLinksItemsLogic;
