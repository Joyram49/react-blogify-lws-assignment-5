import { useContext, useDebugValue } from "react";
import { BlogContext } from "../../context";

export const useBlog = () => {
  const { dispatch } = useContext(BlogContext);
  useDebugValue(dispatch, (dispatch) => (dispatch ? "yes" : "no"));
  return useContext(BlogContext);
};
