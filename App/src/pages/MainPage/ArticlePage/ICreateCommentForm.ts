import { ArticlesTypesNumbers } from "enums/ArticlesTypesNumbers";

export interface ICreateCommentForm {
  content: string;
}

export interface ICreateCommentRequest {
  content: string;
  articleId: number;
  articleType: ArticlesTypesNumbers;
}
