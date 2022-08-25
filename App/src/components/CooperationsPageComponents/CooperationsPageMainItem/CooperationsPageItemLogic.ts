import { archiveCooperation } from "api/CooperationsClient";
import { detailsRoute } from "constants/apiRoutes";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCooperationsIsArchived } from "redux/slices/cooperationsSlice";

const CooperationsPageItemLogic = (cooperation: CooperationVm) => {
  const deleteItemButton = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { isMobile } = useAppResponsiveness();
  const navigate = useNavigate();
  const archiveItem = async () => {
    await archiveCooperation(cooperation.id);
    dispatch(updateCooperationsIsArchived(cooperation.id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigateToDetails = (e: any) => {
    if (
      (deleteItemButton.current &&
        !deleteItemButton.current.contains(e.target)) ||
      cooperation.isArchived
    ) {
      navigate(`${cooperation.id}/${detailsRoute}`);
    }
  };

  return { archiveItem, navigateToDetails, deleteItemButton, isMobile };
};

export default CooperationsPageItemLogic;
