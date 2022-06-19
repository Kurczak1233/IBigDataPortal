import { ToastModes } from "interfaces/General/ToastModes";
import SuccessStatus from "public/StatusesIcons/SuccessIcon.svg";
import ErrorStatus from "public/StatusesIcons/ErrorIcon.svg";
import WarningStatus from "public/StatusesIcons/WarningIcon.svg";
import InfoStatus from "public/StatusesIcons/InfoIcon.svg";
import styles from "./SyncToast.module.scss";

const SyncToastLogic = () => {
  const differentiateStatuses = (status: ToastModes) => {
    switch (status) {
      case ToastModes.Error: {
        return {
          title: "Error",
          icon: ErrorStatus,
          leftBar: styles.syncToastLeftBarRed,
        };
      }
      case ToastModes.Info: {
        return {
          title: "Info",
          icon: InfoStatus,
          leftBar: styles.syncToastLeftBarBlue,
        };
      }
      case ToastModes.Warning: {
        return {
          title: "Warning",
          icon: WarningStatus,
          leftBar: styles.syncToastLeftBarOrange,
        };
      }
      case ToastModes.Success: {
        return {
          title: "Success",
          icon: SuccessStatus,
          leftBar: styles.syncToastLeftBarGreen,
        };
      }
      default: {
        return {
          title: "Error",
          icon: ErrorStatus,
          leftBar: styles.syncToastLeftBarRed,
        };
      }
    }
  };

  return { differentiateStatuses };
};

export default SyncToastLogic;
