import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { useApi } from "../../hooks/api/useApi";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import Error from "../ui/Error";
import NoDataFound from "../ui/NoDataFound";
import BlogPostLoader from "../ui/loader/BlogPostLoader";
import Blog from "./Blog";

export default function BlogList() {
  const { state, dispatch } = useBlogs();

  const { api } = useApi();
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        dispatch({ type: actions.blogs.DATA_FETCHING, data: true });
        const response = await api.get(`/blogs?limit=10&page=${state?.page}`);
        if (response?.status === 200) {
          if (response?.data?.blogs?.length === 0) {
            dispatch({ type: actions.blogs.DATA_FETCHING, data: false });
            setHasMore(false);
          } else {
            dispatch({
              type: actions.blogs.DATA_FETCHED,
              data: {
                blogs: response?.data?.blogs,
                page: response?.data?.page,
              },
            });
          }
        }
      } catch (error) {
        dispatch({
          type: actions.blogs.DATA_FETCH_ERROR,
          error: error?.message,
        });
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchAllBlogs();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    } else {
      toast.warning("There are no blogs left!", {
        position: "bottom-center",
      });
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
      // clearTimeout(timeOutId);
    };
  }, [api, dispatch, state?.blogs, hasMore, state?.page]);

  // decide what to render
  let content = null;

  if (state?.loading && hasMore) {
    content = (
      <div className='flex flex-col gap-y-10'>
        <BlogPostLoader />
        <BlogPostLoader />
        <BlogPostLoader />
      </div>
    );
  }

  if (!state?.loading && state?.error) {
    content = <Error error={state?.error} />;
  }
  if (!state.loading && !state?.error && state?.blogs?.length === 0) {
    content = <NoDataFound />;
  }

  if (state?.blogs && state?.blogs?.length > 0) {
    content = state.blogs.map((blog) => <Blog data={blog} key={blog?.id} />);
  }

  return (
    <>
      {content}

      {hasMore && !state?.loading && !state?.error && (
        <div ref={loaderRef} className='flex gap-2 justify-center'>
          <div className='w-3 h-3 rounded-full animate-pulse bg-blue-800'></div>
          <div className='w-3 h-3 rounded-full animate-pulse bg-blue-800'></div>
          <div className='w-3 h-3 rounded-full animate-pulse bg-indigo-800'></div>
        </div>
      )}
    </>
  );
}
