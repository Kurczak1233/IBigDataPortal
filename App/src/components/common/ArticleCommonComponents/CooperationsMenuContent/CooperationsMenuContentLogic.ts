import { useDispatch, useSelector } from "react-redux";
import { updateShowArchived } from "redux/slices/cooperationsSlice";
import { RootState } from "redux/store";

const CooperationsMenuContentLogic = () => {
  const dispatch = useDispatch();

  const isArchived = useSelector(
    (state: RootState) => state.cooperationsReducer.showArchived
  );

  const setArchivedAsCurrent = () => {
    dispatch(updateShowArchived(true));
  };

  const setActiveAsCurrent = () => {
    dispatch(updateShowArchived(false));
  };

  return { setActiveAsCurrent, setArchivedAsCurrent, isArchived };
};

export default CooperationsMenuContentLogic;
