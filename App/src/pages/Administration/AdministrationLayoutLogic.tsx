import DashboardIconActive from "public/NavigationIcons/Active/DashboardIconOrange.svg";
import DashboardIconNonActive from "public/NavigationIcons/Inactive/DashboardIconGray.svg";
import ItemsListsActive from "public/NavigationIcons/Active/ItemsListsOrange.svg";
import ItemsListsNonActive from "public/NavigationIcons/Inactive/ItemsListsGray.svg";
import MailIconActive from "public/NavigationIcons/Active/MailIconOrange.svg";
import MailIconNonActive from "public/NavigationIcons/Inactive/MailIconGray.svg";
import UserIconActive from "public/NavigationIcons/Active/UserIconOrange.svg";
import UserIconNonActive from "public/NavigationIcons/Inactive/UserIconGray.svg";
import UsersIconActive from "public/NavigationIcons/Active/UsersIconOrange.svg";
import UsersIconNonActive from "public/NavigationIcons/Inactive/UsersIconGray.svg";
import { useLocation } from "react-router-dom";
import {
  administrationRoute,
  dashboardRoute,
  invitationsRoute,
  postsRoute,
  profileRoute,
  usersRoute,
} from "constants/apiRoutes";

const AdministrationLayoutLogic = () => {
  const { pathname } = useLocation();
  const administrationRoutes = [
    {
      routeUrl: `/${administrationRoute}/${dashboardRoute}`,
      imgNonActive: DashboardIconNonActive,
      imgActive: DashboardIconActive,
      alt: "Dashboard icon",
    },
    {
      routeUrl: `/${administrationRoute}/${postsRoute}`,
      imgNonActive: ItemsListsNonActive,
      imgActive: ItemsListsActive,
      alt: "Items lists icon",
    },
    {
      routeUrl: `/${administrationRoute}/${invitationsRoute}`,
      imgNonActive: MailIconNonActive,
      imgActive: MailIconActive,
      alt: "Mail icon",
    },
    {
      routeUrl: `/${administrationRoute}/${profileRoute}`,
      imgNonActive: UserIconNonActive,
      imgActive: UserIconActive,
      alt: "User icon",
    },
    {
      routeUrl: `/${administrationRoute}/${usersRoute}`,
      imgNonActive: UsersIconNonActive,
      imgActive: UsersIconActive,
      alt: "Users icon",
    },
  ];

  return { administrationRoutes, pathname };
};

export default AdministrationLayoutLogic;
