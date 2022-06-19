import { useState } from "react";

const FileModalItemLogic = () => {
  const [isExitIconActive, setIsExitIconActive] = useState<boolean>(false);
  return { isExitIconActive, setIsExitIconActive };
};

export default FileModalItemLogic;
