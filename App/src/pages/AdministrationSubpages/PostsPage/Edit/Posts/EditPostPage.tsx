import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useLocation } from "react-router-dom";

const EditPostPage = () => {
  const location = useLocation();
  const state = location.state as PostViewModel;
  return <div>{state.id}</div>;
};

export default EditPostPage;
