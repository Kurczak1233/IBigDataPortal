import EduLinksContent from "components/ArticlesComponents/Overview/EduLinksPage/EduLinksContent/EduLinksContent";
import BigLoader from "components/common/Loaders/BigLoader/BigLoader";
import EduLinksPageLogic from "./EduLinksPageLogic";

const EduLinksPage = () => {
  const { eduLinks, setEduLinks } = EduLinksPageLogic();
  return (
    <>
      {eduLinks ? (
        <EduLinksContent eduLinks={eduLinks} setEduLinks={setEduLinks} />
      ) : (
        <BigLoader />
      )}
    </>
  );
};

export default EduLinksPage;
