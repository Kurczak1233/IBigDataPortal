import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";

interface IArticlesState {
  postsFiltered: PostViewModel[];
  posts: PostViewModel[];
  jobOffersFiltered: JobOfferViewModel[];
  jobOffers: JobOfferViewModel[];
  eduLinksFiltered: EduLinkViewModel[];
  eduLinks: EduLinkViewModel[];
}

const initialState: IArticlesState = {
  postsFiltered: [],
  jobOffersFiltered: [],
  eduLinksFiltered: [],
  posts: [],
  jobOffers: [],
  eduLinks: [],
};

const articlesFiltersSlice = createSlice({
  name: "articlesFilters",
  initialState,
  reducers: {
    initializePostsFilters: (state, action: PayloadAction<PostViewModel[]>) => {
      state.postsFiltered = action.payload;
      state.posts = action.payload;
    },
    filterPosts: (state, action: PayloadAction<PostViewModel[]>) => {
      state.postsFiltered = action.payload;
    },
    initializeJobOffersFilters: (
      state,
      action: PayloadAction<JobOfferViewModel[]>
    ) => {
      state.jobOffersFiltered = action.payload;
      state.jobOffers = action.payload;
    },
    filterJobOffers: (state, action: PayloadAction<JobOfferViewModel[]>) => {
      state.jobOffersFiltered = action.payload;
    },
    initializeEduLinksFilters: (
      state,
      action: PayloadAction<EduLinkViewModel[]>
    ) => {
      state.eduLinksFiltered = action.payload;
      state.eduLinks = action.payload;
    },
    filterEduLinks: (state, action: PayloadAction<EduLinkViewModel[]>) => {
      state.eduLinksFiltered = action.payload;
    },
  },
});

export const {
  initializePostsFilters,
  initializeJobOffersFilters,
  initializeEduLinksFilters,
  filterPosts,
  filterJobOffers,
  filterEduLinks,
} = articlesFiltersSlice.actions;
export default articlesFiltersSlice.reducer;
