import { actions } from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  isSuccess: false,
};

const favouriteBlogsReducer = (state, action) => {
  switch (action.type) {
    case actions.favouriteBlogs.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.favouriteBlogs.DATA_SUCCEED:
      return {
        ...state,
        loading: false,
        isSuccess: true,
      };
    case actions.favouriteBlogs.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        blogs: action.data,
      };
    case actions.favouriteBlogs.DATA_FETCH_ERROR:
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

export { favouriteBlogsReducer, initialState };
