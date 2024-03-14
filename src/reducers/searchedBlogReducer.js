import { actions } from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  isSuccess: false,
  searched: "",
};

const searchedBlogReducer = (state, action) => {
  switch (action.type) {
    case actions.searchedBlogs.DATA_FETCHING:
      return {
        ...state,
        loading: true,
        searched: action.searchedText,
      };
    case actions.searchedBlogs.DATA_SUCCEED:
      return {
        ...state,
        isSuccess: action.data,
        loading: false,
      };
    case actions.searchedBlogs.DATA_FETCHED:
      return {
        ...state,
        blogs: action.data.blogs,
        searched: action.data.searchedText,
      };
    case actions.searchedBlogs.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export { initialState, searchedBlogReducer };
