import { IAdminMenuContentArray } from "components/common/AdminMenu/AdminMenuContentGenerator/Interfaces/IAdminMenuContentArray";
import { IAdministrationRoute } from "components/common/AdminMenu/AdminMenuMobileHeader/AdminMenuMobileHeaderLogic";
import {
  postsRoute,
  jobOffersRoute,
  eduLinksRoute,
  createPostRoute,
  createJobOfferRoute,
  createEduLinkRoute,
  administrationRoute,
  articlesRoute,
  cooperationsRoute,
  dashboardRoute,
  profileRoute,
  usersRoute,
} from "constants/apiRoutes";
import { UserRoles } from "enums/UserRoles";
import { useLocation } from "react-router-dom";
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
import { RootState } from "redux/store";
import { useSelector } from "react-redux";

export const useAppNavigationProps = () => {
  const appUser = useSelector(
    (states: RootState) => states.applicationUserReducer.user
  );

  const { pathname } = useLocation();
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
        switchTo: createJobOfferRoute,
        isActive: pathname.includes(`${createJobOfferRoute}`),
      },
      {
        itemName: "Edu link",
        switchTo: createEduLinkRoute,
        isActive: pathname.includes(`${createEduLinkRoute}`),
      },
    ],
  };

  const administrationRoutes: IAdministrationRoute[] = [
    {
      routeUrl: `/${administrationRoute}/${articlesRoute}/${postsRoute}`,
      routeName: "Articles",
      imgNonActive: ItemsListsNonActive,
      imgActive: ItemsListsActive,
      isActive: pathname.includes(articlesRoute),
      alt: "Items lists icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Employee,
    },
    {
      routeUrl: `/${administrationRoute}/${profileRoute}`,
      routeName: "Profile",
      imgNonActive: UserIconNonActive,
      imgActive: UserIconActive,
      isActive: pathname === `/${administrationRoute}/${profileRoute}`,
      alt: "User icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Employee,
    },
    {
      routeUrl: `/${administrationRoute}/${dashboardRoute}`,
      routeName: "Dashboards",
      imgNonActive: DashboardIconNonActive,
      imgActive: DashboardIconActive,
      isActive: pathname === `/${administrationRoute}/${dashboardRoute}`,
      alt: "Dashboard icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Admin,
    },
    {
      routeUrl: `/${administrationRoute}/${usersRoute}`,
      routeName: "Users",
      imgNonActive: UsersIconNonActive,
      imgActive: UsersIconActive,
      isActive: pathname === `/${administrationRoute}/${usersRoute}`,
      alt: "Users icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Admin,
    },
    {
      routeUrl: `/${administrationRoute}/${cooperationsRoute}`,
      routeName: "Invitations",
      imgNonActive: MailIconNonActive,
      imgActive: MailIconActive,
      isActive: pathname.includes(cooperationsRoute),
      alt: "Mail icon",
      hasPermissionsToView: appUser && appUser.userRoleId <= UserRoles.Admin,
      showAmountOfInvitations: true,
    },
  ];

  return {
    administrationRoutes,
    adminMenuNavigationCreateContents,
    adminMenuNavigationOverviewContents,
  };
};
