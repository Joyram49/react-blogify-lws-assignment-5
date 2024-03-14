import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions";
import BlogInfo from "../components/blogDetails/blogInfo/BlogInfo";
import BlogComments from "../components/blogDetails/comments/BlogComments";
import FloatingActions from "../components/blogDetails/floatingActions/FloatingActions";
import Error from "../components/ui/Error";
import BlogLoader from "../components/ui/loader/BlogLoader";
import { useAuthorizedApi } from "../hooks/api/useAuthorizedApi";
import { useBlog } from "../hooks/blog/useBlog";

export default function BlogDetailsPage() {
  const { state, dispatch } = useBlog();
  const { blogId } = useParams();
  const { authorizedApi } = useAuthorizedApi();

  useEffect(() => {
    dispatch({ type: actions.blog.DATA_FETCHING });
    const fetchBlogData = async () => {
      try {
        const response = await authorizedApi.get(`/blogs/${blogId}`);
        if (response?.status === 200) {
          dispatch({
            type: actions.blog.DATA_FETCHED,
            data: response?.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error?.message,
        });
      }
    };
    fetchBlogData();
  }, [blogId, dispatch, authorizedApi]);

  // decide what to render
  let content = null;
  if (state?.loading) {
    content = <BlogLoader />;
  }

  if (state?.error) {
    content = <Error error={state?.error} />;
  }

  if (!state?.loading && state?.blog?.id) {
    content = (
      <main>
        {/* <!-- Begin Blogs --> */}
        <section>
          <BlogInfo blog={state?.blog} />
        </section>
        {/* <!-- End Blogs --> */}
        {/* <!-- Begin Comments --> */}
        <BlogComments blog={state?.blog} />
        <FloatingActions blog={state?.blog} />
      </main>
    );
  }
  return content;
}
