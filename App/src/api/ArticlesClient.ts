import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Articles = "Articles";

const getAllArticles = async (): Promise<ArticlesVm> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Articles}`, base);
};

export { getAllArticles };
