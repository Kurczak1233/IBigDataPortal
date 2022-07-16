import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { IDeleteCommentRequest } from "pages/MainPage/ArticlePage/ArticleComment/DeleteCommentRequest";
import { IUpdateCommentRequest } from "pages/MainPage/ArticlePage/ArticleComment/UpdateCommentRequest";
import { ICreateCommentRequest } from "pages/MainPage/ArticlePage/ICreateCommentForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Comments = "Comments";

const createComment = async (body: ICreateCommentRequest): Promise<number> => {
  return AxiosClient(HttpRequestsMethods.POST, `${Comments}`, base, { body });
};

const updateCommentText = async (
  body: IUpdateCommentRequest
): Promise<number> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${Comments}`, base, { body });
};

const deleteComment = async (body: IDeleteCommentRequest): Promise<number> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${Comments}/Delete`, base, {
    body,
  });
};

export { createComment, updateCommentText, deleteComment };
