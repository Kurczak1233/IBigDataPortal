import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import CreatePostPageLogic from "./CreatePostPageLogic";
import styles from "./CreatePostPage.module.scss";
import AddFileComponent from "components/ArticlesComponents/Create/AddFileComponent/AddFileComponent";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";

const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    submitForm,
    errors,
    setPostsFiles,
    postFiles,
    isPostCreating,
  } = CreatePostPageLogic();

  return (
    <div>
      <div className={styles.postsWrapper}>
        <form className={styles.form}>
          <AdministartionPageHeader pageTitle={"Create post"} />
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
            isLoading={isPostCreating}
          />
        </form>
        <AddFileComponent
          setPostsFiles={setPostsFiles}
          postFiles={postFiles}
          module={FileModuleEnum.postsFiles}
        />
      </div>
    </div>
  );
};

export default CreatePostPage;
