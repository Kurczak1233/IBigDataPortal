import {
  administrationRoute,
  articlesRoute,
  createEduLinkRoute,
} from "constants/apiRoutes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";

const EduLinksContentLogic = () => {
  const filteredEduLinks = useSelector(
    (state: RootState) => state.articlesFiltersReducer.eduLinksFiltered
  );
  const [filtersSet, setFiltersSet] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateToCreateEduLink = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${createEduLinkRoute}`);
  };

  return {
    navigateToCreateEduLink,
    filteredEduLinks,
    filtersSet,
    setFiltersSet,
  };
};

export default EduLinksContentLogic;
