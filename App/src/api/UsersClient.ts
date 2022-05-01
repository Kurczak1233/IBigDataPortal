import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { IApplicationUser } from "interfaces/Models/IApplicationUser";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Users = "Users";

// const getChecklistsFormTemplates = async (): Promise<boolean> => {
//   return AxiosClient(HttpRequestsMethods.GET, `${Users}`, base);
// };

const getApplicationUser = async (): Promise<IApplicationUser> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Users}`, base);
};

export { getApplicationUser };
