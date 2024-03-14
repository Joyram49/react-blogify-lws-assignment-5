import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions";
import EditBlogForm from "../components/form/EditBlogForm";
import { useAuthorizedApi } from "../hooks/api/useAuthorizedApi";
import { useBlog } from "../hooks/blog/useBlog";

export default function EditBlogPage() {
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

  return (
    <main>
      <section>
        <div className='container'>
          <h2 className='text-3xl font-bold mb-6 text-center'>Edit A Blog</h2>
          {/* <!-- Form Input field for creating Blog Post --> */}
          {state?.blog && <EditBlogForm blog={state?.blog} />}
        </div>
      </section>
    </main>
  );
}
