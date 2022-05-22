import EduLinksContent from "components/ArticlesComponents/EduLinksPage/EduLinksContent/EduLinksContent";
import BigLoader from "components/common/Loaders/BigLoader";
import EduLinksPageLogic from "./EduLinksPageLogic";

const EduLinksPage = () => {
  const { eduLinks } = EduLinksPageLogic();
  return (
    <>{eduLinks ? <EduLinksContent eduLinks={eduLinks} /> : <BigLoader />}</>
  );
};

export default EduLinksPage;
