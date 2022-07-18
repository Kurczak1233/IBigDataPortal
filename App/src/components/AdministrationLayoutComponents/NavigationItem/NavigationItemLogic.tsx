import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";

const NavigationItemLogic = () => {
  const navigate = useNavigate();
  const cooperationInvitations = useSelector(
    (state: RootState) => state.cooperationsReducer.cooperations
  );

  const clickedOnNavigationItem = (itemUrl: string) => {
    navigate(itemUrl);
  };

  const amountOfActiveCooperations = useMemo(() => {
    return cooperationInvitations.filter((item) => !item.isArchived).length;
  }, [cooperationInvitations]);

  return { clickedOnNavigationItem, amountOfActiveCooperations };
};

export default NavigationItemLogic;
