import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { ICreatePostForm } from "pages/AdministrationSubpages/PostsPage/Create/Post/ICreatePostForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const JobOffers = "JobOffers";

const getAllJobOffers = async (): Promise<JobOfferViewModel[]> => {
  return AxiosClient(HttpRequestsMethods.GET, `${JobOffers}`, base);
};

const createJobOffer = async (body: ICreatePostForm): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.POST, `${JobOffers}`, base, { body });
};

export { getAllJobOffers, createJobOffer };
