import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCooperation } from "redux/slices/cooperationsSlice";
import { RootState } from "redux/store";

const CooperationsDetailsPageMainLogic = () => {
  const dispatch = useDispatch();
  const { cooperationId } = useParams();
  const selectedCooperation = useSelector(
    (state: RootState) => state.cooperationsReducer.selectedCoopreation
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (cooperationId) {
      dispatch(selectCooperation(+cooperationId));
    }
  }, [cooperationId, dispatch]);

  const returnBack = () => {
    navigate(-1);
  };

  return { selectedCooperation, returnBack };
};

export default CooperationsDetailsPageMainLogic;
