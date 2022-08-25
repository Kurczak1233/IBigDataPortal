import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import MenuComponentTitle from "../MenuComponentTitle/MenuComponentTitle";
import styles from "./FilterArticlesComponent.module.scss";
import FilterArticlesComponentLogic from "./FilterArticlesComponentLogic";

interface IFilterArticlesComponent {
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  initialArticlesModel: ArticlesVm | undefined;
}

const FilterArticlesComponent = ({
  setArticles,
  initialArticlesModel,
}: IFilterArticlesComponent) => {
  const {
    areEduLinksVisible,
    areJobOffersVisible,
    arePostsVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
    isMobile,
    isTablet,
    smallerLaptop,
  } = FilterArticlesComponentLogic({ setArticles, initialArticlesModel });

  return (
    <section className={styles.menu}>
      <MenuComponentTitle name={"Filter articles"} />
      <div className={styles.filterPosition}>
        Filter by posts:
        <SmallButton
          text={"Posts"}
          maxWidth={isMobile || isTablet ? "120px" : "50%"}
          width={smallerLaptop ? "60%" : "40%"}
          onClick={filterByPosts}
          color={
            arePostsVisible
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
      </div>
      <div className={styles.filterPosition}>
        Filter by job offers:
        <SmallButton
          maxWidth={isMobile || isTablet ? "120px" : "50%"}
          width={smallerLaptop ? "60%" : "40%"}
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
        Filter by edu links:
        <SmallButton
          maxWidth={isMobile || isTablet ? "120px" : "50%"}
          width={smallerLaptop ? "60%" : "40%"}
          text={"Edu links"}
          onClick={filterByEduLinks}
          color={
            areEduLinksVisible
              ? AvailableIntensiveColors.IntensiveGreen
              : AvailableIntensiveColors.InactiveGray
          }
        />
      </div>
    </section>
  );
};

export default FilterArticlesComponent;
