import { ArticlesTypesNumbers } from "enums/ArticlesTypesNumbers";

export interface IUpdateCommentRequest {
  commentId: number;
  content: string;
  articleId: number;
  articleType: ArticlesTypesNumbers;
}
