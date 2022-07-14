import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import CreatePostPageLogic from "./CreatePostPageLogic";
import styles from "./CreatePostPage.module.scss";
import AddFileComponent from "components/ArticlesComponents/ArticlesFiles/AddFileComponent/AddFileComponent";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller } from "react-hook-form";

const CreatePostPage = () => {
  const {
    register,
    handleSubmit,
    submitForm,
    errors,
    setPostsFiles,
    control,
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
          <div className={styles.richText}>
            <label>Description</label>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value: text } }) => (
                <ReactQuill
                  style={{ width: "100%", height: 250 }}
                  value={text ? text : ""}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <AddFileComponent
            setPostsFiles={setPostsFiles}
            postFiles={postFiles}
            module={FileModuleEnum.postsFiles}
            componentTitle={"Posts files"}
          />
          <SmallButton
            marginTop="16px"
            text={"Save"}
            color={AvailableIntensiveColors.IntensiveGreen}
            onClick={handleSubmit(submitForm)}
            isLoading={isPostCreating}
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
