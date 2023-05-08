import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_HOST, API_VERSION } from "../network/domain";

const useAxios = () => {
  let navigate = useNavigate();

  const instance = axios.create({
    baseURL: `${API_HOST}/api/${API_VERSION}`,
  });

  //request interceptor
  instance.interceptors.request.use((request) => {
    if (!request.url.includes("login") || !request.url.includes("register")) {
      //   request.headers.common["Authorization"] = `Bearer ${auth.token}`;
      request.headers.Accept = "application/json";
      request.headers.post["Content-Type"] = "application/json";

      return request;
    }
  });

  //response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const response = error.response;

      if (!response) {
        return false;
      }

      if (response?.data?.code === 401) {
        localStorage.removeItem("user");

        navigate("/login");
        return false;
      }

      if (response?.data?.code === 500) {
        navigate("/error");
        return false;
      }
      return Promise.reject(error);
    }
  );

  return { instance };
};

export default useAxios;
