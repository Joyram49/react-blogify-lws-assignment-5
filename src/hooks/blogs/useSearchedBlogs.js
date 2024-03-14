import { useContext } from "react";
import { SearchedBlogContext } from "../../context";

export const useSearchedBlogs = () => {
  return useContext(SearchedBlogContext);
};
