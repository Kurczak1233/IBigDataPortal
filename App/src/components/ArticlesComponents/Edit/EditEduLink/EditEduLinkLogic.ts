import { editEduLink } from "api/EduLinksClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  eduLinksRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IEditEduLinkForm } from "./IEditEduLinkForm";

const EditEduLinkLogic = (eduLink: EduLinkViewModel) => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditEduLinkForm>();
  const submitForm = async (data: IEditEduLinkForm) => {
    await editEduLink(data);
    navigate(`/${administrationRoute}/${articlesRoute}/${eduLinksRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have edited a edu link",
    });
  };

  const setPostEditValues = useCallback(() => {
    setValue("title", eduLink.title);
    setValue("description", eduLink.description);
    setValue("link", eduLink.link);
    setValue("eduLinkId", eduLink.id);
  }, [eduLink.description, eduLink.id, eduLink.link, eduLink.title, setValue]);

  useEffect(() => {
    setPostEditValues();
  }, [setPostEditValues]);

  return { submitForm, register, handleSubmit, errors };
};

export default EditEduLinkLogic;
