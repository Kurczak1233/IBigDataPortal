import { deleteEduLink } from "api/EduLinksClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  eduLinksRoute,
} from "constants/apiRoutes";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { ToastModes } from "interfaces/General/ToastModes";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const EduLinkItemLogic = (
  eduLink: EduLinkViewModel,
  setEduLinks:
    | React.Dispatch<React.SetStateAction<EduLinkViewModel[] | undefined>>
    | undefined
) => {
  const { isTablet, isMobile, isVerySmallMobile } = useAppResponsiveness();
  const navigate = useNavigate();
  const deleteItemButton = useRef<HTMLDivElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const naviateToItemOverview = (eduLink: EduLinkViewModel, e: any) => {
    if (
      deleteItemButton.current &&
      !deleteItemButton.current.contains(e.target)
    ) {
      navigate(
        `/${administrationRoute}/${articlesRoute}/${eduLinksRoute}/${eduLink.id}`,
        { state: eduLink }
      );
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteItem = async () => {
    await deleteEduLink(eduLink.id);
    setIsDeleteModalOpen(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${eduLinksRoute}`);
    setEduLinks &&
      setEduLinks((oldEduLinks) => {
        if (!oldEduLinks) {
          return oldEduLinks;
        }
        const eduLinksCopy = [...oldEduLinks];
        const foundEduLinkIndex = eduLinksCopy.findIndex(
          (item) => item.id === eduLink.id
        );
        if (foundEduLinkIndex === -1 || !eduLinksCopy) {
          return oldEduLinks;
        }
        eduLinksCopy.splice(foundEduLinkIndex, 1);
        return [...eduLinksCopy];
      });
    SyncToast({
      mode: ToastModes.Info,
      description: "You have successfully removed this job offer",
    });
  };

  return {
    naviateToItemOverview,
    openDeleteModal,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteItem,
    deleteItemButton,
    isTablet,
    isMobile,
    isVerySmallMobile,
  };
};

export default EduLinkItemLogic;
