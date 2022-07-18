import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";

const NavigationItemLogic = () => {
  const navigate = useNavigate();
  const cooperationsCount = useSelector(
    (state: RootState) => state.cooperationsReducer.cooperationsCount
  );

  const clickedOnNavigationItem = (itemUrl: string) => {
    navigate(itemUrl);
  };

  return { clickedOnNavigationItem, cooperationsCount };
};

export default NavigationItemLogic;
