import { getAllEduLinks } from "api/EduLinksClient";
import { compareAsc } from "date-fns";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeEduLinksFilters } from "redux/slices/articlesFiltersSlice";

const EduLinksPageLogic = () => {
  const [eduLinks, setEduLinks] = useState<EduLinkViewModel[]>();
  const dispatch = useDispatch();
  const handleGetAllEduLinks = useCallback(async () => {
    const result = await getAllEduLinks();
    const sortingResult = result.sort((item, secondItem) =>
      compareAsc(new Date(secondItem.posted), new Date(item.posted))
    );
    setEduLinks(sortingResult);
    dispatch(initializeEduLinksFilters(sortingResult));
  }, [dispatch]);
  useEffect(() => {
    if (!eduLinks) {
      handleGetAllEduLinks();
    }
  }, [eduLinks, handleGetAllEduLinks]);
  return { eduLinks, setEduLinks };
};

export default EduLinksPageLogic;
