import { deleteJobOffer } from "api/JobOffersClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobOfferItemLogic = (
  jobOffer: JobOfferViewModel,
  setJobOffers:
    | React.Dispatch<React.SetStateAction<JobOfferViewModel[] | undefined>>
    | undefined
) => {
  const navigate = useNavigate();
  const deleteItemButton = useRef<HTMLDivElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const naviateToItemOverview = (post: JobOfferViewModel, e: any) => {
    if (
      deleteItemButton.current &&
      !deleteItemButton.current.contains(e.target)
    ) {
      navigate(
        `/${administrationRoute}/${articlesRoute}/${jobOffersRoute}/${post.id}`,
        { state: post }
      );
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteItem = async () => {
    await deleteJobOffer(jobOffer.id);
    setIsDeleteModalOpen(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${jobOffersRoute}`);
    setJobOffers &&
      setJobOffers((oldJobOffers) => {
        const foundJobOfferIndex = oldJobOffers?.findIndex(
          (item) => item.id === jobOffer.id
        );
        if (!foundJobOfferIndex || !oldJobOffers) {
          return oldJobOffers;
        }
        oldJobOffers.splice(foundJobOfferIndex, 1);
        return [...oldJobOffers];
      });
    SyncToast({
      mode: ToastModes.Info,
      description: "You have successfully removed this job offer",
    });
  };

  return {
    naviateToItemOverview,
    deleteItemButton,
    openDeleteModal,
    handleDeleteItem,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };
};

export default JobOfferItemLogic;
