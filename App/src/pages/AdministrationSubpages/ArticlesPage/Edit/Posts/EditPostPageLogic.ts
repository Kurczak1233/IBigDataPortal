import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useLocation } from "react-router-dom";

const EditPostPageLogic = () => {
  const location = useLocation();
  const state = location.state as PostViewModel;

  // const getAllItemsFiles = () => {

  // }

  // useEffect(() => {
  //   handleFileImages();
  // }, [])
  return { state };
};

export default EditPostPageLogic;
