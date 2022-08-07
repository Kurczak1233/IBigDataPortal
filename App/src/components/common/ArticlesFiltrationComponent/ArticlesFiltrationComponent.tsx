import styles from "./ArticlesFiltrationComponent.module.scss";
import GreenFilterIcon from "public/GreenFilterIcon.svg";
import ArticlesFiltrationComponentLogic from "./ArticlesFiltrationComponentLogic";
import ArticlesFilterModal from "./ArticlesFilterModal/ArticlesFilterModal";
import { ArticlesTypes } from "enums/ArticlesTypes";

interface IArticlesFiltrationComponent {
  articleType: ArticlesTypes;
  setFiltersSet?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticlesFiltrationComponent = ({
  articleType,
  setFiltersSet,
}: IArticlesFiltrationComponent) => {
  const { handleCloseModal, handleOpenModal, isModalOpen } =
    ArticlesFiltrationComponentLogic();
  return (
    <>
      <ArticlesFilterModal
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        articleType={articleType}
        setFiltersSet={setFiltersSet}
      />
      <div className={styles.filterButton} onClick={handleOpenModal}>
        <span>Filter</span>
        <img
          className={styles.image}
          src={GreenFilterIcon}
          alt={"Filter icon"}
        />
      </div>
    </>
  );
};

export default ArticlesFiltrationComponent;
