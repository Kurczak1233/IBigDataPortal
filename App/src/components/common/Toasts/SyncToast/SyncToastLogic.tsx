import { ToastModes } from "interfaces/General/ToastModes";
import SuccessStatus from "public/StatusesIcons/SuccessIcon.svg";
import ErrorStatus from "public/StatusesIcons/ErrorIcon.svg";
import WarningStatus from "public/StatusesIcons/WarningIcon.svg";
import InfoStatus from "public/StatusesIcons/InfoIcon.svg";

const SyncToastLogic = () => {
  const differentiateStatuses = (status: ToastModes) => {
    switch (status) {
      case ToastModes.Error: {
        return { title: "Error", icon: ErrorStatus };
      }
      case ToastModes.Info: {
        return { title: "Info", icon: InfoStatus };
      }
      case ToastModes.Warning: {
        return { title: "Warning", icon: WarningStatus };
      }
      case ToastModes.Success: {
        return { title: "Success", icon: SuccessStatus };
      }
      default: {
        return { title: "Error", icon: ErrorStatus };
      }
    }
  };

  return { differentiateStatuses };
};

export default SyncToastLogic;
