import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import EditPostLogic from "./EditPostLogic";
import styles from "./EditPost.module.scss";

interface IEditPost {
  post: PostViewModel;
  postFiles: File[];
}

const EditPost = ({ post, postFiles }: IEditPost) => {
  const { submitForm, register, handleSubmit, errors, isSaving } =
    EditPostLogic(post, postFiles);
  return (
    <form className={styles.editForm}>
      <InputWithLabel
        register={register}
        errors={errors}
        errorMessage={"This field is required"}
        label={"Title"}
        placeholder={"Enter title..."}
        registerName={"title"}
        registerOptions={{ required: true }}
      />
      <TextareaWithLabel
        register={register}
        errors={errors}
        errorMessage={"This field is required"}
        label={"Description"}
        placeholder={"Enter description..."}
        registerName={"description"}
        registerOptions={{ required: true }}
      />
      <SmallButton
        marginTop="16px"
        text={"Save"}
        color={AvailableIntensiveColors.IntensiveGreen}
        onClick={handleSubmit(submitForm)}
        isLoading={isSaving}
      />
    </form>
  );
};

export default EditPost;
