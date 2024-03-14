import { useEffect } from "react";
import { api } from "../../api";

const useApi = () => {
  useEffect(() => {
    // resopnse interceptor for unauthorized api request
    api.interceptors.response.use(
      (response) => {
        // response.data.blogs = [];
        // response.data.total = 0;
        return response;
      },
      (error) => {
        if (error?.response) {
          error.message = error?.response?.data?.message;
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return { api };
};

export { useApi };
