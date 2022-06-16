import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import styles from "./ProfilePageMain.module.scss";
import ProfilePageMainLogic from "./ProfilePageMainLogic";

interface IProfilePageMain {
  userProfile: IApplicationUser;
}

const ProfilePageMain = ({ userProfile }: IProfilePageMain) => {
  const { register, errors } = ProfilePageMainLogic({ userProfile });
  return (
    <div>
      <div className={styles.myDetails}>My details</div>
      <div>Image...</div>
      <InputWithLabel
        label={"Name"}
        placeholder={"Enter name..."}
        registerName={"name"}
        register={register}
        errors={errors}
        errorMessage={""}
      />
    </div>
  );
};

export default ProfilePageMain;
