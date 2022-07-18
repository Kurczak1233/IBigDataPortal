import { getAllCooperations } from "api/CooperationsClient";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCooperations } from "redux/slices/cooperationsSlice";

const CooperationsPageMainLogic = () => {
  const [allCooperations, setAllCooperations] = useState<CooperationVm[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<CooperationVm[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const refContainer = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % allCooperations.length;
    setItemOffset(newOffset);
  };

  const calculateContainerHeight = (item: HTMLDivElement) => {
    if (Math.floor(item.offsetHeight / 68)) {
      setItemsPerPage(Math.floor(item.offsetHeight / 68));
    }
  };

  const handleGetAllInvitations = useCallback(async () => {
    const cooperations = await getAllCooperations();
    dispatch(updateCooperations(cooperations));
    setAllCooperations(cooperations);
  }, [dispatch]);

  useEffect(() => {
    handleGetAllInvitations();
  }, [handleGetAllInvitations]);

  useEffect(() => {
    if (refContainer.current !== null) {
      calculateContainerHeight(refContainer.current);
    }
  }, [refContainer]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allCooperations.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allCooperations.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allCooperations]);

  return {
    allCooperations,
    setAllCooperations,
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
  };
};

export default CooperationsPageMainLogic;
