import { actions } from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  page: 1,
};

const blogsReducer = (state, action) => {
  switch (action.type) {
    case actions.blogs.DATA_FETCHING:
      return {
        ...state,
        loading: action.data,
      };
    case actions.blogs.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, ...action.data.blogs],
        page: action.data.page + 1,
      };

    case actions.blogs.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actions.blogs.CREATE_BLOG:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, ...action.data],
      };

    case actions.blogs.UPDATE_BLOG:
      return {
        ...state,
        loading: false,
        error: null,
        blogs: state?.blogs?.map((blog) => {
          if (blog.id === action?.data?.id) {
            return {
              ...blog,
              thumbnail: action.data.thumbnail,
              title: action.data.title,
              tags: action.data.tags,
              content: action.data.content,
            };
          } else {
            return blog;
          }
        }),
      };
    case actions.blogs.DELETE_BLOG:
      return {
        ...state,
        loading: false,
        error: null,
        blogs: state?.blogs?.filter((blog) => blog.id !== action.id),
      };
    case actions.blogs.TOGGLE_LIKE:
      return {
        ...state,
        loading: false,
        error: null,
        blogs: state?.blogs?.map((blog) => {
          if (blog.id === action?.data?.id) {
            return {
              ...blog,
              likes: action.data.likes,
            };
          } else {
            return blog;
          }
        }),
      };
    default:
      return state;
  }
};

export { blogsReducer, initialState };
