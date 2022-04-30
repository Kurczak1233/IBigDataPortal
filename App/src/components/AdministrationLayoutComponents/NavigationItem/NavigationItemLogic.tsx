import { useNavigate } from "react-router-dom";

const NavigationItemLogic = () => {
  const navigate = useNavigate();

  const clickedOnNavigationItem = (itemUrl: string) => {
    navigate(itemUrl);
  };

  return { clickedOnNavigationItem };
};

export default NavigationItemLogic;
