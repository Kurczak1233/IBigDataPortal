import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";

export interface ArticlesVm {
  eduLinks: EduLinkViewModel;
  jobOffers: JobOfferViewModel;
  posts: PostViewModel;
}
