import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import EditJobOfferLogic from "./EditEduLinkLogic";
import styles from "./EditEduLink.module.scss";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import EditCommentsComponent from "components/ArticlesComponents/ArticlesFiles/EditCommentsComponent/EditCommentsComponent";
import EditFileComponent from "components/ArticlesComponents/ArticlesFiles/EditFileComponent/EditFileComponent";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { FileWithMetadata } from "interfaces/Models/FilesMetadata/ViewModels/FileWithMetadata";

interface IEditEduLink {
  eduLink: EduLinkViewModel;
  eduLinkFiles: File[];
  postFilesWithMetadata: FileWithMetadata[];
  setEduLinkFiles: React.Dispatch<React.SetStateAction<FileWithMetadata[]>>;
}

const EditEduLink = ({
  eduLink,
  eduLinkFiles,
  postFilesWithMetadata,
  setEduLinkFiles,
}: IEditEduLink) => {
  const {
    submitForm,
    register,
    control,
    handleSubmit,
    errors,
    setCommentsPermission,
    commentsPermission,
    setVisibilityPermissions,
    visibilityPermissions,
  } = EditJobOfferLogic({
    eduLink,
    eduLinkFiles,
  });
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
          rules={{ required: true }}
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
            setPostsFiles={setEduLinkFiles}
            postFiles={postFilesWithMetadata}
            module={FileModuleEnum.postsFiles}
          />
        </div>
        <div className={styles.comments}>
          <EditCommentsComponent
            visibilityPermissions={visibilityPermissions}
            setCommentsPermission={setCommentsPermission}
            setVisibilityPermissions={setVisibilityPermissions}
            commentsPermission={commentsPermission}
            intensiveColor={AvailableIntensiveColors.IntensiveOrange}
          />
        </div>
      </div>
      <SmallButton
        marginTop="16px"
        text={"Save"}
        color={AvailableIntensiveColors.IntensiveGreen}
        onClick={handleSubmit(submitForm)}
      />
    </form>
  );
};

export default EditEduLink;
