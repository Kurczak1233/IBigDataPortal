import { useDispatch, useSelector } from "react-redux";
import { updateShowArchived } from "redux/slices/cooperationsSlice";
import { RootState } from "redux/store";

const MobileInvitationsSubPagesLogic = () => {
  const dispatch = useDispatch();

  const isArchived = useSelector(
    (state: RootState) => state.cooperationsReducer.showArchived
  );

  const cooperationsCount = useSelector(
    (state: RootState) => state.cooperationsReducer.cooperationsCount
  );

  const setArchivedAsCurrent = () => {
    dispatch(updateShowArchived(true));
  };

  const setActiveAsCurrent = () => {
    dispatch(updateShowArchived(false));
  };
  return {
    isArchived,
    cooperationsCount,
    setActiveAsCurrent,
    setArchivedAsCurrent,
  };
};

export default MobileInvitationsSubPagesLogic;
