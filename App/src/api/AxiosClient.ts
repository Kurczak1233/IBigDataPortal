/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Method } from "axios";

const AxiosClient = async (
  method: Method,
  endpoint: string,
  applicationBase: string,
  { body, requestContaisFile = false }: any = {}
): Promise<any> => {
  try {
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
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("Request error", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    throw error;
  }
};
export { AxiosClient };
