import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import EditJobOfferLogic from "./EditJobOfferLogic";
import styles from "./EditJobOffer.module.scss";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import EditFileComponent from "components/ArticlesComponents/ArticlesFiles/EditFileComponent/EditFileComponent";
import EditCommentsComponent from "components/ArticlesComponents/ArticlesFiles/EditCommentsComponent/EditCommentsComponent";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { FileWithMetadata } from "interfaces/Models/FilesMetadata/ViewModels/FileWithMetadata";

interface IEditJobOffer {
  jobOffer: JobOfferViewModel;
  jobOfferFiles: File[];
  postFilesWithMetadata: FileWithMetadata[];
  setJobOfferFiles: React.Dispatch<React.SetStateAction<FileWithMetadata[]>>;
}

const EditJobOffer = ({
  jobOffer,
  jobOfferFiles,
  postFilesWithMetadata,
  setJobOfferFiles,
}: IEditJobOffer) => {
  const {
    submitForm,
    register,
    handleSubmit,
    control,
    errors,
    isSaving,
    setCommentsPermission,
    commentsPermission,
    setVisibilityPermissions,
    visibilityPermissions,
  } = EditJobOfferLogic({ jobOffer, jobOfferFiles });
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
            setPostsFiles={setJobOfferFiles}
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
        isLoading={isSaving}
      />
    </form>
  );
};

export default EditJobOffer;
