import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import MobileFiltrationsTopBarLogic from "./MobileFiltrationsTopBarLogic";
import styles from "./MobileFiltrationsTopBar.module.scss";
import MenuComponentTitle from "../MenuComponentTitle/MenuComponentTitle";
import AdvancedFilters from "../AdvancedFilters/AdvancedFilters";
import UserDetailsComponent from "../UserDetailsComponent/UserDetailsComponent";
import { User } from "@auth0/auth0-react";
import InvitationsComponent from "../InvitationsComponent/InvitationsComponent";
interface IMobileFiltrationsTopBar {
  initialArticlesModel: ArticlesVm | undefined;
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  user: User | undefined;
}

const MobileFiltrationsTopBar = ({
  initialArticlesModel,
  setArticles,
  user,
}: IMobileFiltrationsTopBar) => {
  const {
    arePostsVisible,
    areJobOffersVisible,
    areEduLinksVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
    isTablet,
  } = MobileFiltrationsTopBarLogic(initialArticlesModel, setArticles);
  return (
    <div className={styles.mobileHeader}>
      <div className={styles.mobileMenuWrapper}>
        {isTablet && <UserDetailsComponent />}
        {user !== undefined && isTablet && <InvitationsComponent />}
        <div className={styles.simpleFiltersComponent}>
          <MenuComponentTitle name={"Filter posts"} />
          <div className={styles.topBarWrapper}>
            <div className={styles.filterPosition}>
              <SmallButton
                text={"Posts"}
                width={"90%"}
                onClick={filterByPosts}
                color={
                  arePostsVisible
                    ? AvailableIntensiveColors.IntensiveOrange
                    : AvailableIntensiveColors.InactiveGray
                }
              />
            </div>
            <div className={styles.filterPosition}>
              <SmallButton
                width={"90%"}
                text={"Job offers"}
                onClick={filterByJobOffers}
                color={
                  areJobOffersVisible
                    ? AvailableIntensiveColors.IntensiveBlue
                    : AvailableIntensiveColors.InactiveGray
                }
              />
            </div>
            <div className={styles.filterPosition}>
              <SmallButton
                width={"90%"}
                text={"Edu links"}
                onClick={filterByEduLinks}
                color={
                  areEduLinksVisible
                    ? AvailableIntensiveColors.IntensiveGreen
                    : AvailableIntensiveColors.InactiveGray
                }
              />
            </div>
          </div>
        </div>
        <AdvancedFilters
          setArticles={setArticles}
          initialArticlesModel={initialArticlesModel}
          showSeparationBar={false}
          marginBottom={"32px"}
        />
      </div>
    </div>
  );
};

export default MobileFiltrationsTopBar;
