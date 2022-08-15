import { getAllCooperations } from "api/CooperationsClient";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCooperations } from "redux/slices/cooperationsSlice";
import { RootState } from "redux/store";

const CooperationsPageMainLogic = () => {
  const [allCooperations, setAllCooperations] = useState<CooperationVm[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<CooperationVm[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const refContainer = useRef<HTMLDivElement>(null);

  const cooperations = useSelector(
    (state: RootState) => state.cooperationsReducer.cooperations
  );
  const showArchived = useSelector(
    (state: RootState) => state.cooperationsReducer.showArchived
  );
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
    if (allCooperations.length > 0) {
      setAllCooperations(cooperations);
    }
  }, [allCooperations.length, cooperations]);

  useEffect(() => {
    if (refContainer.current !== null) {
      calculateContainerHeight(refContainer.current);
    }
  }, [refContainer]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const filteredItems = allCooperations.filter((item) => {
      return showArchived ? item.isArchived : !item.isArchived;
    });
    setCurrentItems(filteredItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allCooperations, showArchived]);

  return {
    allCooperations,
    setAllCooperations,
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
    showArchived,
  };
};

export default CooperationsPageMainLogic;
