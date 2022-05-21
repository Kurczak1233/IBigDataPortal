import { createPost } from "api/PostsClient";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICreatePostForm } from "./ICreatePostForm";

const CreatePostPageLogic = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostForm>();
  const submitForm = async (data: ICreatePostForm) => {
    await createPost(data);
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
  };
  return { submitForm, register, handleSubmit, errors };
};

export default CreatePostPageLogic;
