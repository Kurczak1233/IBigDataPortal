import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const CommonAdminPanelHeaderLogic = () => {
  const applicationUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );

  return { applicationUser };
};
export default CommonAdminPanelHeaderLogic;
