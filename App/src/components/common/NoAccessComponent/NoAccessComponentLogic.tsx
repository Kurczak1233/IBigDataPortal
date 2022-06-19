import { useNavigate } from "react-router-dom";

const NoAccessComponentLogic = () => {
  const navigate = useNavigate();
  const handleReturnButtonClick = () => {
    navigate("/");
  };

  return { handleReturnButtonClick };
};

export default NoAccessComponentLogic;
