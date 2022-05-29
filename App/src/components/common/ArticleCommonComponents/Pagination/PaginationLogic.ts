import { AvailablePaginationColors } from "./AvailablePaginationColors";
import GreenRightArrow from "public/PostsIcons/GreenRightArrow.svg";
import GreenLeftArrow from "public/PostsIcons/GreenLeftArrow.svg";
import BlueRightArrow from "public/PostsIcons/BlueRightArrow.svg";
import BlueLeftArrow from "public/PostsIcons/BlueLeftArrow.svg";
import OrangeRightArrow from "public/PostsIcons/OrangeRightArrow.svg";
import OrangeLeftArrow from "public/PostsIcons/OrangeLeftArrow.svg";

const PaginationLogic = () => {
  const getAppropriateIcons = (color: AvailablePaginationColors) => {
    switch (color) {
      case AvailablePaginationColors.blue: {
        return { iconLeft: BlueLeftArrow, iconRight: BlueRightArrow };
      }
      case AvailablePaginationColors.green: {
        return { iconLeft: GreenLeftArrow, iconRight: GreenRightArrow };
      }
      case AvailablePaginationColors.orange: {
        return { iconLeft: OrangeLeftArrow, iconRight: OrangeRightArrow };
      }
    }
  };
  return { getAppropriateIcons };
};

export default PaginationLogic;
