import { IUpdateProfileForm } from "components/ProfilePageComponents/ProfilePageMain/IUpdateProfileForm";
import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Users = "Users";

const getApplicationUser = async (): Promise<ApplicationUser> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Users}/Current`, base);
};

const getAllPortalUsers = async (): Promise<ApplicationUser[]> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Users}/All`, base);
};

const updateUserNickname = async (body: IUpdateProfileForm): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${Users}`, base, { body });
};

export { getApplicationUser, updateUserNickname, getAllPortalUsers };
