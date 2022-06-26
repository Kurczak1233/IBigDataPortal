import { IUpdateProfileForm } from "components/ProfilePageComponents/ProfilePageMain/IUpdateProfileForm";
import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Users = "Users";

const getApplicationUser = async (): Promise<IApplicationUser> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Users}`, base);
};

const updateUserNickname = async (body: IUpdateProfileForm): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${Users}`, base, { body });
};

export { getApplicationUser, updateUserNickname };
