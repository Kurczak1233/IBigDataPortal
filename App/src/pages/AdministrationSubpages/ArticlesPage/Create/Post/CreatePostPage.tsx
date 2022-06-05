import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./CreatePostPage.module.scss";
import CreatePostPageLogic from "./CreatePostPageLogic";

const CreatePostPage = () => {
  const { register, handleSubmit, submitForm, errors } = CreatePostPageLogic();
  return (
    <div>
      <div className={styles.title}>Create Post</div>
      <form>
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
        />
      </form>
    </div>
  );
};

export default CreatePostPage;
