import { useReducer } from "react";
import { ProfileContext } from "../context";
import { initialState, profileReducer } from "../reducers/profileReducer";

export default function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}
