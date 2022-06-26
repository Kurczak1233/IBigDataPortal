import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import CreateJobOfferPageLogic from "./CreateJobOfferPageLogic";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import AddFileComponent from "components/ArticlesComponents/ArticlesFiles/AddFileComponent/AddFileComponent";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import styles from "./CreateJobOfferPage.module.scss";

const CreateJobOfferPage = () => {
  const {
    register,
    handleSubmit,
    submitForm,
    errors,
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
          <InputWithLabel
            register={register}
            errors={errors}
            errorMessage={"This field is required"}
            label={"Link"}
            placeholder={"Enter link..."}
            registerName={"link"}
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
            isLoading={isJobOfferCreating}
          />
        </form>
        <AddFileComponent
          setPostsFiles={setJobOffersFiles}
          postFiles={jobOfferFiles}
          module={FileModuleEnum.jobOffersFiles}
          componentTitle={"Job offer files"}
        />
      </div>
    </div>
  );
};

export default CreateJobOfferPage;
