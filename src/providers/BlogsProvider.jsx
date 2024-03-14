import { useReducer } from "react";
import { BlogsContext } from "../context";
import { blogsReducer, initialState } from "../reducers/blogsReducer";

export default function BlogsProvider({ children }) {
  const [state, dispatch] = useReducer(blogsReducer, initialState);

  return (
    <BlogsContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
}
