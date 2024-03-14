import { useEffect, useReducer } from "react";
import { actions } from "../../../actions";
import { useApi } from "../../../hooks/api/useApi";
import {
  initialState,
  popularBlogsReducer,
} from "../../../reducers/popularBlogsReducer";
import PopularBlog from "./PopularBlog";

export default function PopularBlogList() {
  const [state, dispatch] = useReducer(popularBlogsReducer, initialState);
  const { api } = useApi();

  useEffect(() => {
    dispatch({ type: actions.popularBlogs.DATA_FETCHING });
    const fetchPopularBlogs = async () => {
      try {
        const response = await api.get("/blogs/popular");
        if (response?.status === 200) {
          dispatch({ type: actions.popularBlogs.DATA_SUCCEED });
          dispatch({
            type: actions.popularBlogs.DATA_FETCHED,
            data: response?.data?.blogs,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.popularBlogs.DATA_FETCH_ERROR,
          error: error?.message,
        });
      }
    };
    fetchPopularBlogs();
  }, [api]);

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
    content = <div className='font-semibold'>Most Popular has no blogs</div>;
  }

  if (state?.isSuccess && state?.blogs && state?.blogs?.length > 0) {
    content = state.blogs.map((blog) => (
      <PopularBlog data={blog} key={blog?.id} />
    ));
  }

  return (
    <div className='sidebar-card'>
      <h3 className='text-slate-300 text-xl lg:text-2xl font-semibold'>
        Most Popular 👍️
      </h3>

      <ul className='space-y-5 my-5'>{content}</ul>
    </div>
  );
}
