import { IUpdateUserRole } from "components/UsersPageComponents/UsersPageMainItem/IUpdateUserRole";
import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const UserRole = "UserRole";

const updateUserRole = async (body: IUpdateUserRole): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${UserRole}`, base, { body });
};

export { updateUserRole };
