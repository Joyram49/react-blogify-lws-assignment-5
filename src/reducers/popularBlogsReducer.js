import { actions } from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  isSuccess: false,
};

const popularBlogsReducer = (state, action) => {
  switch (action.type) {
    case actions.popularBlogs.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.popularBlogs.DATA_SUCCEED:
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    case actions.popularBlogs.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        blogs: action.data,
      };
    case actions.popularBlogs.DATA_FETCH_ERROR:
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

export { initialState, popularBlogsReducer };
