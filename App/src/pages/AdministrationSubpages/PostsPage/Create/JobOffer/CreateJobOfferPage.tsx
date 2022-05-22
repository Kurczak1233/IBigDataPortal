import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import CreateJobOfferPageLogic from "./CreateJobOfferPageLogic";
import styles from "./CreateJobOfferPage.module.scss";

const CreateJobOfferPage = () => {
  const { register, handleSubmit, submitForm, errors } =
    CreateJobOfferPageLogic();

  return (
    <div>
      <div className={styles.title}>Create Job offer</div>
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

export default CreateJobOfferPage;
