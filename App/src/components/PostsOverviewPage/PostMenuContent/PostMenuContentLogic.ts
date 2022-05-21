import {
  administrationRoute,
  articlesRoute,
  createEduLinkRoute,
  createJobOfferRoute,
  createPostRoute,
  eduLinksRoute,
  jobOffersRoute,
  postsRoute,
} from "constants/apiRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { IAdminMenuContentArray } from "../../common/AdminMenu/AdminMenuContentGenerator/Interfaces/IAdminMenuContentArray";

const PostMenuContentLogic = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChangeState = (route: string) => {
    navigate(`/${administrationRoute}/${articlesRoute}/${route}`);
  };

  const adminMenuNavigationOverviewContents: IAdminMenuContentArray = {
    sectionName: "Overview",
    items: [
      {
        itemName: "Posts",
        switchTo: postsRoute,
        isActive: pathname.includes(`${postsRoute}`),
      },
      {
        itemName: "Job offers",
        switchTo: jobOffersRoute,
        isActive: pathname.includes(`${jobOffersRoute}`),
      },
      {
        itemName: "Edu links",
        switchTo: eduLinksRoute,
        isActive: pathname.includes(`${eduLinksRoute}`),
      },
    ],
  };

  const adminMenuNavigationCreateContents: IAdminMenuContentArray = {
    sectionName: "Create",
    items: [
      {
        itemName: "Post",
        switchTo: createPostRoute,
        isActive: pathname.includes(`${createPostRoute}`),
      },
      {
        itemName: "Job offer",
        switchTo: createEduLinkRoute,
        isActive: pathname.includes(`${createEduLinkRoute}`),
      },
      {
        itemName: "Edu link",
        switchTo: createJobOfferRoute,
        isActive: pathname.includes(`${createJobOfferRoute}`),
      },
    ],
  };

  return {
    handleChangeState,
    adminMenuNavigationOverviewContents,
    adminMenuNavigationCreateContents,
  };
};

export default PostMenuContentLogic;
