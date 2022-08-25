import { ArticlesTypes } from "enums/ArticlesTypes";
import { ArticlesTypesNumbers } from "enums/ArticlesTypesNumbers";

export const convertArticleTypeStringToInt = (articleType: string): number => {
  switch (articleType) {
    case ArticlesTypes.Post: {
      return ArticlesTypesNumbers.Post;
    }
    case ArticlesTypes.JobOffer: {
      return ArticlesTypesNumbers.JobOffer;
    }
    case ArticlesTypes.EduLink: {
      return ArticlesTypesNumbers.EduLink;
    }
    default:
      return -1;
  }
};
