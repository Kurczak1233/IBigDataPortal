import toast from "react-hot-toast";
import styles from "./SyncToast.module.scss";
import "./SyncToast.module.scss";
import { ToastModes } from "interfaces/General/ToastModes";
import SyncToastLogic from "./SyncToastLogic";
import CloseIcon from "public/CloseIcon.svg";

interface ISyncToast {
  mode: ToastModes;
  description: string;
}

const SyncToast = ({ mode, description }: ISyncToast) => {
  const { differentiateStatuses } = SyncToastLogic();
  const currentStatus = differentiateStatuses(mode);
  return toast.custom(
    <div className={styles.syncToastWrapper}>
      <div className={currentStatus.leftBar} />
      <img
        height={24}
        width={24}
        src={currentStatus.icon}
        alt={currentStatus.title}
        className={styles.statusIcon}
      />
      <div className={styles.textPart}>
        <div className={styles.statusTitle}>{currentStatus.title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <img
        onClick={() => toast.remove()}
        height={24}
        width={24}
        src={CloseIcon}
        alt={"Close"}
        className={styles.exitIcon}
      />
    </div>,
    {
      id: "toast",
      position: "bottom-right",
      duration: 2000,
    }
  );
};

export default SyncToast;
