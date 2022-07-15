import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import CreateJobOfferPageLogic from "./CreateJobOfferPageLogic";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import AddFileComponent from "components/ArticlesComponents/ArticlesFiles/AddFileComponent/AddFileComponent";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import styles from "./CreateJobOfferPage.module.scss";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

const CreateJobOfferPage = () => {
  const {
    register,
    handleSubmit,
    submitForm,
    errors,
    control,
    setJobOffersFiles,
    jobOfferFiles,
    isJobOfferCreating,
  } = CreateJobOfferPageLogic();
  return (
    <div>
      <div className={styles.jobOffersWrapper}>
        <form className={styles.form}>
          <AdministartionPageHeader pageTitle={"Create job offer"} />
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
                  style={{ width: "100%", height: 250 }}
                  value={text ? text : ""}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <AddFileComponent
            setPostsFiles={setJobOffersFiles}
            postFiles={jobOfferFiles}
            module={FileModuleEnum.jobOffersFiles}
            componentTitle={"Job offer files"}
          />
          <SmallButton
            marginTop="16px"
            text={"Save"}
            color={AvailableIntensiveColors.IntensiveGreen}
            onClick={handleSubmit(submitForm)}
            isLoading={isJobOfferCreating}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJobOfferPage;
