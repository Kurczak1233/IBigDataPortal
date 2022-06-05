import { getAllEduLinks } from "api/EduLinksClient";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useState, useEffect } from "react";

const EduLinksPageLogic = () => {
  const [eduLinks, setEduLinks] = useState<EduLinkViewModel[]>();
  const handleGetAllEduLinks = async () => {
    setEduLinks(await getAllEduLinks());
  };
  useEffect(() => {
    if (!eduLinks) {
      handleGetAllEduLinks();
    }
  }, [eduLinks]);
  return { eduLinks };
};

export default EduLinksPageLogic;
