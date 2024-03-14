import { useEffect, useReducer } from "react";
import { actions } from "../../../actions";
import { useAuthorizedApi } from "../../../hooks/api/useAuthorizedApi";
import {
  favouriteBlogsReducer,
  initialState,
} from "../../../reducers/favouriteBlogsReducer";
import FavBlog from "./FavBlog";

export default function FavBlogList() {
  const [state, dispatch] = useReducer(favouriteBlogsReducer, initialState);
  const { authorizedApi } = useAuthorizedApi();

  useEffect(() => {
    dispatch({ type: actions.favouriteBlogs.DATA_FETCHING });
    const fetchFavBlogs = async () => {
      try {
        const response = await authorizedApi.get("/blogs/favourites");
        if (response?.status === 200) {
          dispatch({ type: actions.favouriteBlogs.DATA_SUCCEED });
          dispatch({
            type: actions.favouriteBlogs.DATA_FETCHED,
            data: response?.data?.blogs,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.favouriteBlogs.DATA_FETCH_ERROR,
          error: error?.message,
        });
      }
    };
    fetchFavBlogs();
  }, [authorizedApi]);

  // decide what to render
  let content = null;
  if (state?.loading) {
    content = (
      <div className='flex gap-2 justify-center'>
        <div className='w-3 h-3 rounded-full animate-pulse bg-blue-800'></div>
        <div className='w-3 h-3 rounded-full animate-pulse bg-blue-800'></div>
        <div className='w-3 h-3 rounded-full animate-pulse bg-indigo-800'></div>
      </div>
    );
  }

  if (state?.error) {
    content = <div className='font-semibold'>{state?.error}</div>;
  }
  if (state?.isSuccess && state?.blogs && state?.blogs?.length === 0) {
    content = (
      <div className='font-semibold'>
        You{` haven't`} add any blog to your favourite list.
      </div>
    );
  }

  if (state?.isSuccess && state?.blogs && state?.blogs?.length > 0) {
    content = state.blogs.map((blog) => <FavBlog data={blog} key={blog?.id} />);
  }

  return (
    <div className='sidebar-card'>
      <h3 className='text-slate-300 text-xl lg:text-2xl font-semibold'>
        Your Favourites ❤️
      </h3>
      <ul className='space-y-5 my-5'>{content}</ul>
    </div>
  );
}
