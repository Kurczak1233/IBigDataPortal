import { IEditJobOfferRequest } from "components/ArticlesComponents/Edit/EditJobOffer/IEditJobOfferForm";
import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { ICreateJobOfferRequest } from "pages/AdministrationSubpages/ArticlesPage/Create/JobOffer/ICreateJobOfferForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const JobOffers = "JobOffers";

const getAllJobOffers = async (): Promise<JobOfferViewModel[]> => {
  return AxiosClient(HttpRequestsMethods.GET, `${JobOffers}`, base);
};

const createJobOffer = async (
  body: ICreateJobOfferRequest
): Promise<number> => {
  return AxiosClient(HttpRequestsMethods.POST, `${JobOffers}`, base, { body });
};

const editJobOffer = async (body: IEditJobOfferRequest): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${JobOffers}`, base, { body });
};

const deleteJobOffer = async (itemId: number): Promise<null> => {
  return AxiosClient(
    HttpRequestsMethods.PUT,
    `${JobOffers}/Delete/${itemId}`,
    base
  );
};

export { getAllJobOffers, createJobOffer, editJobOffer, deleteJobOffer };
