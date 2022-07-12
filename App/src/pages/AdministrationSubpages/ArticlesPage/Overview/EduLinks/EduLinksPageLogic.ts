import { getAllEduLinks } from "api/EduLinksClient";
import { compareAsc } from "date-fns";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useState, useEffect } from "react";

const EduLinksPageLogic = () => {
  const [eduLinks, setEduLinks] = useState<EduLinkViewModel[]>();
  const handleGetAllEduLinks = async () => {
    const result = await getAllEduLinks();
    setEduLinks(
      result.sort((item, secondItem) =>
        compareAsc(new Date(secondItem.posted), new Date(item.posted))
      )
    );
  };
  useEffect(() => {
    if (!eduLinks) {
      handleGetAllEduLinks();
    }
  }, [eduLinks]);
  return { eduLinks, setEduLinks };
};

export default EduLinksPageLogic;
