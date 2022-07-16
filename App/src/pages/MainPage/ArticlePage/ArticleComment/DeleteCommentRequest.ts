import { ArticlesTypesNumbers } from "enums/ArticlesTypesNumbers";

export interface IDeleteCommentRequest {
  commentId: number;
  articleId: number;
  articleType: ArticlesTypesNumbers;
}
