import { useEffect } from "react";
import { actions } from "../../actions";
import { authorizedApi } from "../../api";
import { useAuth } from "../auth/useAuth";
import { useBlogs } from "../blogs/useBlogs";
import { useApi } from "./useApi";

const useAuthorizedApi = () => {
  const { auth, setAuth } = useAuth();
  const { api } = useApi();
  const { dispatch } = useBlogs();

  useEffect(() => {
    // request interceptors for providing bearer token in authorization headers
    const requestInterceptor = authorizedApi.interceptors.request.use(
      (config) => {
        const accessToken = auth?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        if (config.url === "/blogs" && config.method === "post") {
          config.headers["Content-Type"] = "multipart/form-data";
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // response interceptors for unauthorized response and re-connect with refresh token
    const responseInterceptor = authorizedApi.interceptors.response.use(
      (response) => {
        // intercept response for toggle like and update with id
        const url = response?.config.url;
        const regexLikes = /\/blogs\/(\w+)\//;
        const match = url.match(regexLikes);
        if (match && match[1]) {
          const blogId = match[1];
          dispatch({
            type: actions.blogs.TOGGLE_LIKE,
            data: {
              id: blogId,
              likes: response?.data?.likes,
            },
          });
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error?.response && error.response.status === 403) {
          try {
            const refreshToken = auth?.refreshToken;
            const response = await api.post(`/auth/refresh-token`, {
              refreshToken,
            });
            const data = response?.data;

            // resetting local storage and auth with updated token
            const authInfo = localStorage.getItem("authInfo");
            const localAuth = JSON.parse(authInfo);
            const nextAuth = {
              ...localAuth,
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
            };
            localStorage.setItem("authInfo", JSON.stringify(nextAuth));
            setAuth({
              ...auth,
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
            });

            //retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;
            return api(originalRequest);
          } catch (error) {
            // console.log(error);
            throw error;
          }
        }

        if (error?.response) {
          error.message = error?.response?.data?.message;
        }

        return Promise.reject(error);
      }
    );

    return () => {
      authorizedApi.interceptors.request.eject(requestInterceptor);
      authorizedApi.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.accessToken, api, auth]);
  return { authorizedApi };
};

export { useAuthorizedApi };
