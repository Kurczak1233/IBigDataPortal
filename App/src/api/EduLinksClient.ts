import { IEditEduLinkRequest } from "components/ArticlesComponents/Edit/EditEduLink/IEditEduLinkForm";
import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { ICreateEduLinkRequest } from "pages/AdministrationSubpages/ArticlesPage/Create/EduLinks/ICreateEduLinkForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const EduLinks = "EduLinks";

const getAllEduLinks = async (): Promise<JobOfferViewModel[]> => {
  return AxiosClient(HttpRequestsMethods.GET, `${EduLinks}`, base);
};

const createEduLink = async (body: ICreateEduLinkRequest): Promise<number> => {
  return AxiosClient(HttpRequestsMethods.POST, `${EduLinks}`, base, { body });
};

const editEduLink = async (body: IEditEduLinkRequest): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${EduLinks}`, base, { body });
};

const deleteEduLink = async (itemId: number): Promise<null> => {
  return AxiosClient(
    HttpRequestsMethods.PUT,
    `${EduLinks}/Delete/${itemId}`,
    base
  );
};

export { getAllEduLinks, createEduLink, editEduLink, deleteEduLink };
