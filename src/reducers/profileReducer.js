import { actions } from "../actions";

const initialState = {
  profile: {},
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.profile.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        profile: action.data,
      };
    case actions.profile.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.profile.UPLOAD_AVATAR:
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, ...action.data },
      };
    case actions.profile.UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, bio: action.data },
      };
    case actions.profile.BLOG_DELETE:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          blogs: state.profile.blogs.filter((blog) => blog.id !== action.data),
        },
      };
    default:
      return state;
  }
};

export { initialState, profileReducer };
