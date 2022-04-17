import { useNavigate } from "react-router-dom";

const NoAccessComponentLogic = () => {
  const navigate = useNavigate();
  const handleReturnButtonClick = () => {
    navigate(-1);
  };

  return { handleReturnButtonClick };
};

export default NoAccessComponentLogic;
