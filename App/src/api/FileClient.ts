import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Files = "Files";

const uploadFile = async (body: FormData): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.POST, `${Files}`, base, {
    body: body,
    requestContaisFile: true,
  });
};

export { uploadFile };
