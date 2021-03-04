import axios from "axios";
import log from "loglevel";

function requester(config) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      log.error(error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => {
      log.error(error);
      return Promise.reject(error);
    }
  );

  return axiosInstance(config);
}

export default requester;
