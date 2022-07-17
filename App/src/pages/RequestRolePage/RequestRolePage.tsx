import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import TextareaWithLabel from "components/common/Forms/TextareaWithLabel/TextareaWithLabel";
import styles from "./RequestRolePage.module.scss";
import RequestRolePageLogic from "./RequestRolePageLogic";
import IBigWorldLogo from "public/IBigWorldLogo.png";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import BigButton from "components/common/Buttons/BigButtons/BigButton";

const RequestRolePage = () => {
  const { errors, register, handleSubmit, navigateToMainPage, submitRequest } =
    RequestRolePageLogic();
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.topBackground} />
      <div className={styles.bottomBackground} />
      <div className={styles.overlay}>
        <div className={styles.title}>GET IN TOUCH</div>
        <div className={styles.subtitle}>
          Collaborate with big data specialists and gain an access to the
          platform
        </div>
        <div className={styles.envelopeWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.leftSide}>
              <div className={styles.leftSideTitle}>Request a role</div>
              <InputWithLabel
                register={register}
                errors={errors}
                errorMessage={"This field is required"}
                label={"Topic"}
                placeholder={"Enter request topic..."}
                registerName={"topic"}
                registerOptions={{ required: true }}
              />
              <TextareaWithLabel
                label={"Description"}
                placeholder={
                  "Explain who you are and why you should gain an access to the platform"
                }
                registerName={"description"}
                register={register}
                errors={errors}
                errorMessage={"This field is required"}
                registerOptions={{ required: true }}
              />
              <SmallButton
                text={"Submit"}
                marginTop={"16px"}
                onClick={handleSubmit(submitRequest)}
                color={AvailableIntensiveColors.IntensiveGreen}
              />
            </div>
            <div className={styles.right}>
              <img src={IBigWorldLogo} alt="Platform logo" width={"70%"} />
            </div>
          </div>
        </div>
        <div className={styles.return}>
          <BigButton
            text={"Return"}
            onClick={navigateToMainPage}
            color={AvailableIntensiveColors.IntensiveGreen}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestRolePage;
