import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IPostsItems {
  jobOffers: JobOfferViewModel[];
}

const JobOffersItemsLogic = ({ jobOffers }: IPostsItems) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<JobOfferViewModel[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const navigate = useNavigate();
  const refContainer = useRef<HTMLDivElement>(null);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % jobOffers.length;
    setItemOffset(newOffset);
  };

  const calculateContainerHeight = (item: HTMLDivElement) => {
    if (Math.floor(item.offsetHeight / 68)) {
      setItemsPerPage(Math.floor(item.offsetHeight / 68));
    }
  };

  const naviateToItemOverview = (jobOffer: JobOfferViewModel) => {
    navigate(
      `/${administrationRoute}/${articlesRoute}/${jobOffersRoute}/${jobOffer.id}`,
      { state: jobOffer }
    );
  };

  useEffect(() => {
    if (refContainer.current !== null) {
      calculateContainerHeight(refContainer.current);
    }
  }, [refContainer]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(jobOffers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(jobOffers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, jobOffers]);

  return {
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
    naviateToItemOverview,
  };
};

export default JobOffersItemsLogic;
