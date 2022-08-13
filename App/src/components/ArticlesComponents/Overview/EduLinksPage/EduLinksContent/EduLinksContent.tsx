import NoItemsComponent from "components/common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import EduLinksContentLogic from "./EduLinksContentLogic";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import EduLinksHeader from "../EduLinksHeader/EduLinksHeader";
import EduLinksItems from "../EduLinksItems/EduLinksItems";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import { ArticlesTypes } from "enums/ArticlesTypes";

interface IEduLinksContent {
  eduLinks: EduLinkViewModel[];
  setEduLinks: React.Dispatch<
    React.SetStateAction<EduLinkViewModel[] | undefined>
  >;
}

const EduLinksContent = ({ eduLinks, setEduLinks }: IEduLinksContent) => {
  const {
    navigateToCreateEduLink,
    filteredEduLinks,
    filtersSet,
    setFiltersSet,
  } = EduLinksContentLogic();
  return (
    <>
      {eduLinks.length === 0 ? (
        <NoItemsComponent
          title={"There are no job offers"}
          navigateToPage={navigateToCreateEduLink}
        />
      ) : (
        <>
          <AdministartionPageHeader
            pageTitle={"Overview posts"}
            showFilterComponent
            articleType={ArticlesTypes.EduLink}
            setFiltersSet={setFiltersSet}
          />
          <EduLinksHeader
            iconsColour={AvailableIntensiveColors.IntensiveGreen}
          />
          <EduLinksItems
            eduLinks={filtersSet ? filteredEduLinks : eduLinks}
            eduLinkColor={AvailableIntensiveColors.LessIntensiveGreen}
            paginationColor={AvailablePaginationColors.green}
            setEduLinks={setEduLinks}
          />
        </>
      )}
    </>
  );
};

export default EduLinksContent;
