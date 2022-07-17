import { User } from "@auth0/auth0-react";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import AdvancedFilters from "./AdvancedFilters/AdvancedFilters";
import FilterArticlesComponent from "./FilterArticlesComponent/FilterArticlesComponent";
import InvitationsComponent from "./InvitationsComponent/InvitationsComponent";
import styles from "./Menu.module.scss";
import UserDetailsComponent from "./UserDetailsComponent/UserDetailsComponent";

interface IMenu {
  initialArticlesModel: ArticlesVm | undefined;
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  user: User | undefined;
}

const Menu = ({ setArticles, initialArticlesModel, user }: IMenu) => {
  return (
    <aside className={styles.menuSite}>
      <div className={styles.headerTitle}>Menu</div>
      <UserDetailsComponent />
      {user !== undefined && <InvitationsComponent />}
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
