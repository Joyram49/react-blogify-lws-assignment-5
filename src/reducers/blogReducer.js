import { actions } from "../actions";

const initialState = {
  blog: {},
  loading: false,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case actions.blog.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.blog.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        blog: action.data,
      };
    case actions.blog.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.blog.TOGGLE_LIKE_BLOG:
      return {
        ...state,
        loading: false,
        error: null,
        blog: {
          ...state.blog,
          likes: action.data.likes,
        },
      };
    case actions.blog.TOGGLE_FAVOURITE_BLOG:
      return {
        ...state,
        loading: false,
        error: null,
        blog: { ...action.data },
      };
    case actions.blog.ADD_OR_DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        error: null,
        blog: {
          ...state.blog,
          comments: action.data,
        },
      };
    default:
      return state;
  }
};

export { blogReducer, initialState };
