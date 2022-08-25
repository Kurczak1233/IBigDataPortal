import { useEffect } from "react";

export const useCheckIfItemShouldBeClosed = (
  isItemOpen: boolean,
  element: React.RefObject<HTMLDivElement>,
  closeObject: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: { target: any }) => {
      if (
        isItemOpen &&
        element.current &&
        !element.current.contains(e.target)
      ) {
        closeObject(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [closeObject, element, isItemOpen]);
};
