import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { RequestRoleForm } from "pages/RequestRolePage/RequestRoleForm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Cooperations = "Cooperations";

const createCooperationRequest = async (
  body: RequestRoleForm
): Promise<number> => {
  return AxiosClient(HttpRequestsMethods.POST, `${Cooperations}`, base, {
    body,
  });
};

export { createCooperationRequest };
