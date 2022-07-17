import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import MenuComponentTitle from "../MenuComponentTitle/MenuComponentTitle";
import styles from "./InvitationsComponent.module.scss";

const InvitationsComponent = () => {
  return (
    <section className={styles.menu}>
      <MenuComponentTitle name={"Interactions"} />
      <div className={styles.roleRequest}>
        <div>Request a role: </div>
        <SmallButton
          text={"Request"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          width={"40%"}
          color={AvailableIntensiveColors.IntensiveBlue}
        />
      </div>
    </section>
  );
};

export default InvitationsComponent;
