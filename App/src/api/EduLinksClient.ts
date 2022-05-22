import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { ICreateEduLink } from "pages/AdministrationSubpages/PostsPage/Create/EduLinks/ICreateEduLinkForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const EduLinks = "EduLinks";

const getAllEduLinks = async (): Promise<JobOfferViewModel[]> => {
  return AxiosClient(HttpRequestsMethods.GET, `${EduLinks}`, base);
};

const createEduLink = async (body: ICreateEduLink): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.POST, `${EduLinks}`, base, { body });
};

export { getAllEduLinks, createEduLink };
