// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
// import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";

// interface IArticlesState {
//   articles: ArticlesVm | null;
//   chosenArticle: ArticlesVm | null;
// }

// const initialState: IArticlesState = {
//   articles: null,
//   chosenArticle: null,
// };

// const articlesSlice = createSlice({
//   name: "articles",
//   initialState,
//   reducers: {
//     updateArticles: (state, action: PayloadAction<ArticlesVm>) => {
//       state.articles = action.payload;
//     },
//     setChosenArticle: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { updateApplicationUser, removeApplicationUser } =
//   articlesSlice.actions;
// export default articlesSlice.reducer;
