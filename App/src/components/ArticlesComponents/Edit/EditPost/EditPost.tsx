import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import EditPostLogic from "./EditPostLogic";
import styles from "./EditPost.module.scss";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { FileWithMetadata } from "interfaces/Models/FilesMetadata/ViewModels/FileWithMetadata";
import EditFileComponent from "components/ArticlesComponents/ArticlesFiles/EditFileComponent/EditFileComponent";
import EditCommentsComponent from "components/ArticlesComponents/ArticlesFiles/EditCommentsComponent/EditCommentsComponent";

interface IEditPost {
  post: PostViewModel;
  postFiles: File[];
  postFilesWithMetadata: FileWithMetadata[];
  setPostFiles: React.Dispatch<React.SetStateAction<FileWithMetadata[]>>;
}

const EditPost = ({
  post,
  postFiles,
  postFilesWithMetadata,
  setPostFiles,
}: IEditPost) => {
  const { submitForm, register, control, handleSubmit, errors, isSaving } =
    EditPostLogic(post, postFiles);
  return (
    <>
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
        <div className={styles.richTextLabel}>
          <span className={styles.label}>Description</span>
          {errors.description && (
            <span className={styles.error}>
              You are not allowed to submit empty description
            </span>
          )}
        </div>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value: text } }) => (
            <ReactQuill
              style={{ width: "100%", height: 210 }}
              value={text ? text : ""}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className={styles.commentsAndFiles}>
        <div className={styles.files}>
          <EditFileComponent
            setPostsFiles={setPostFiles}
            postFiles={postFilesWithMetadata}
            module={FileModuleEnum.postsFiles}
          />
        </div>
        <div className={styles.comments}>
          <EditCommentsComponent />
        </div>
      </div>
      <SmallButton
        marginTop="16px"
        text={"Save"}
        color={AvailableIntensiveColors.IntensiveGreen}
        onClick={handleSubmit(submitForm)}
        isLoading={isSaving}
      />
    </>
  );
};

export default EditPost;
