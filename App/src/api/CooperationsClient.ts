import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";
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

const getAllCooperations = async (): Promise<CooperationVm[]> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Cooperations}`, base);
};

const archiveCooperation = async (
  cooperationId: number
): Promise<CooperationVm[]> => {
  return AxiosClient(
    HttpRequestsMethods.PUT,
    `${Cooperations}/${cooperationId}`,
    base
  );
};

export { createCooperationRequest, getAllCooperations, archiveCooperation };
