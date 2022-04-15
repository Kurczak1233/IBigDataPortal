import { HttpRequestsMethods } from "interfaces/HttpRequestsMethods";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Users = "WeatherForecast";

const getChecklistsFormTemplates = async (): Promise<boolean> => {
  return AxiosClient(HttpRequestsMethods.GET, `${Users}`, base);
};

export { getChecklistsFormTemplates };
