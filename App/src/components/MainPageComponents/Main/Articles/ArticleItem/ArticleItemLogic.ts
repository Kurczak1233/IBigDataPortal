import { ArticlesTypes } from "enums/ArticlesTypes";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { useMemo } from "react";
import { IMergedPosts } from "../ArticlesLogic";

const ArticleItemLogic = (article: IMergedPosts) => {
  const findArticleColour = (type: string): AvailableIntensiveColors => {
    switch (type) {
      case ArticlesTypes.Post:
        return AvailableIntensiveColors.LessIntensiveOrange;
      case ArticlesTypes.EduLink:
        return AvailableIntensiveColors.LessIntensiveGreen;
      case ArticlesTypes.JobOffer:
        return AvailableIntensiveColors.LessIntensiveBlue;
      default:
        return AvailableIntensiveColors.LessIntensiveOrange;
    }
  };

  const findIntensiveArticleColour = (
    type: string
  ): AvailableIntensiveColors => {
    switch (type) {
      case ArticlesTypes.Post:
        return AvailableIntensiveColors.IntensiveOrange;
      case ArticlesTypes.EduLink:
        return AvailableIntensiveColors.IntensiveGreen;
      case ArticlesTypes.JobOffer:
        return AvailableIntensiveColors.IntensiveBlue;
      default:
        return AvailableIntensiveColors.IntensiveOrange;
    }
  };

  const componentColour = useMemo(() => {
    return findArticleColour(article.type);
  }, [article]);
  const componentIntensiveColour = useMemo(() => {
    return findIntensiveArticleColour(article.type);
  }, [article]);

  return { componentColour, componentIntensiveColour };
};
export default ArticleItemLogic;
