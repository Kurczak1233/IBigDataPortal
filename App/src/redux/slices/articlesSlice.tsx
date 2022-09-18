import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMergedPosts } from "components/MainPageComponents/Main/Articles/ArticlesLogic";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { IUpdateCommentRequest } from "pages/MainPage/ArticlePage/ArticleComment/UpdateCommentRequest";

interface IArticlesState {
  articles: IMergedPosts[];
  chosenArticle: IMergedPosts | null;
}

const initialState: IArticlesState = {
  articles: [],
  chosenArticle: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    updateArticles: (state, action: PayloadAction<IMergedPosts[]>) => {
      state.articles = action.payload;
    },
    setChosenArticle: (state, action: PayloadAction<IMergedPosts | null>) => {
      state.chosenArticle = action.payload;
    },
    setChosenArticleComments: (state, action: PayloadAction<CommentVm[]>) => {
      if (!state.chosenArticle) {
        return;
      }
      state.chosenArticle.comments = action.payload;
    },
    updateArticleComment: (
      state,
      action: PayloadAction<IUpdateCommentRequest>
    ) => {
      if (!state.chosenArticle) {
        return;
      }
      const foundComment = state.chosenArticle.comments.find(
        (item) => item.commentId === action.payload.commentId
      );
      if (!foundComment) {
        return;
      }
      foundComment.content = action.payload.content;
    },
    deleteArticleComment: (state, action: PayloadAction<number>) => {
      if (!state.chosenArticle) {
        return;
      }
      const foundCommentIndex = state.chosenArticle.comments.findIndex(
        (item) => item.commentId === action.payload
      );
      if (foundCommentIndex === -1) {
        return;
      }
      state.chosenArticle.comments.splice(foundCommentIndex, 1);
    },
  },
});

export const {
  updateArticles,
  setChosenArticle,
  setChosenArticleComments,
  deleteArticleComment,
  updateArticleComment,
} = articlesSlice.actions;
export default articlesSlice.reducer;
