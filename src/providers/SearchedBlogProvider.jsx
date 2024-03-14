import { useReducer } from "react";
import { SearchedBlogContext } from "../context";
import {
  initialState,
  searchedBlogReducer,
} from "../reducers/searchedBlogReducer";

export default function SearchedBlogProvider({ children }) {
  const [state, dispatch] = useReducer(searchedBlogReducer, initialState);
  return (
    <SearchedBlogContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchedBlogContext.Provider>
  );
}
