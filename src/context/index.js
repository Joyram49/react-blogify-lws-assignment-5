import { createContext } from "react";

const AuthContext = createContext();
const BlogsContext = createContext();
const BlogContext = createContext();
const ProfileContext = createContext();
const SearchedBlogContext = createContext();

export {
  AuthContext,
  BlogContext,
  BlogsContext,
  ProfileContext,
  SearchedBlogContext,
};
