import CreateEduLinkPageLogic from "./CreateEduLinkPageLogic";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";

const CreateEduLinkPage = () => {
  const { register, handleSubmit, submitForm, errors } =
    CreateEduLinkPageLogic();

  return (
    <div>
      <AdministartionPageHeader pageTitle={"Create edu link"} />
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
    </div>
  );
};

export default CreateEduLinkPage;
