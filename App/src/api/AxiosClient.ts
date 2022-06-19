/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Method } from "axios";

const AxiosClient = async (
  method: Method,
  endpoint: string,
  applicationBase: string,
  { body, requestContaisFile = false }: any = {}
): Promise<any> => {
  const requestResult = await axios({
    method: method,
    url: `${applicationBase}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: requestContaisFile ? body : JSON.stringify(body),
  });
  return requestResult.data;
};
export { AxiosClient };
