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
  articlesRoute,
  dashboardRoute,
  cooperationsRoute,
  postsRoute,
  profileRoute,
  usersRoute,
} from "constants/apiRoutes";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { UserRoles } from "enums/UserRoles";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";

const AdministrationLayoutLogic = () => {
  const { pathname } = useLocation();
  const appUser = useSelector(
    (states: RootState) => states.applicationUserReducer.user
  );
  const { isTablet, isMobile } = useAppResponsiveness();

  const administrationRoutes = [
    {
      routeUrl: `/${administrationRoute}/${articlesRoute}/${postsRoute}`,
      imgNonActive: ItemsListsNonActive,
      imgActive: ItemsListsActive,
      isActive: pathname.includes(articlesRoute),
      alt: "Items lists icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Employee,
    },
    {
      routeUrl: `/${administrationRoute}/${profileRoute}`,
      imgNonActive: UserIconNonActive,
      imgActive: UserIconActive,
      isActive: pathname === `/${administrationRoute}/${profileRoute}`,
      alt: "User icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Employee,
    },
    {
      routeUrl: `/${administrationRoute}/${dashboardRoute}`,
      imgNonActive: DashboardIconNonActive,
      imgActive: DashboardIconActive,
      isActive: pathname === `/${administrationRoute}/${dashboardRoute}`,
      alt: "Dashboard icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Admin,
    },
    {
      routeUrl: `/${administrationRoute}/${usersRoute}`,
      imgNonActive: UsersIconNonActive,
      imgActive: UsersIconActive,
      isActive: pathname === `/${administrationRoute}/${usersRoute}`,
      alt: "Users icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Admin,
    },
    {
      routeUrl: `/${administrationRoute}/${cooperationsRoute}`,
      imgNonActive: MailIconNonActive,
      imgActive: MailIconActive,
      isActive: pathname.includes(cooperationsRoute),
      alt: "Mail icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Admin,
      showAmountOfInvitations: true,
    },
  ];

  return { administrationRoutes, isTablet, isMobile };
};

export default AdministrationLayoutLogic;
