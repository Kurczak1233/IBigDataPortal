import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useLocation } from "react-router-dom";

const EditEduLinkPage = () => {
  const location = useLocation();
  const state = location.state as EduLinkViewModel;
  return <div>{state.id}</div>;
};

export default EditEduLinkPage;
