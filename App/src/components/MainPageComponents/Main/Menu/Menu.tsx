import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import AdvancedFilters from "./AdvancedFilters/AdvancedFilters";
import FilterArticlesComponent from "./FilterArticlesComponent/FilterArticlesComponent";
import styles from "./Menu.module.scss";
import UserDetailsComponent from "./UserDetailsComponent/UserDetailsComponent";

interface IMenu {
  initialArticlesModel: ArticlesVm | undefined;
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
}

const Menu = ({ setArticles, initialArticlesModel }: IMenu) => {
  return (
    <aside className={styles.menuSite}>
      <div className={styles.headerTitle}>Menu</div>
      <UserDetailsComponent />
      <FilterArticlesComponent
        setArticles={setArticles}
        initialArticlesModel={initialArticlesModel}
      />
      <AdvancedFilters
        setArticles={setArticles}
        initialArticlesModel={initialArticlesModel}
      />
    </aside>
  );
};

export default Menu;
