import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import EditJobOfferLogic from "./EditJobOfferLogic";
import styles from "./EditJobOffer.module.scss";

interface IEditJobOffer {
  jobOffer: JobOfferViewModel;
}

const EditJobOffer = ({ jobOffer }: IEditJobOffer) => {
  const { submitForm, register, handleSubmit, errors } =
    EditJobOfferLogic(jobOffer);
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
      />
    </form>
  );
};

export default EditJobOffer;
