import { useSearchedBlogs } from "../../../../hooks/blogs/useSearchedBlogs";
import SearchedBlog from "./SearchedBlog";

export default function SearchResult({ setShowModal }) {
  const { state } = useSearchedBlogs();

  // decide what to render
  let content = null;

  if (state?.loading) {
    content = (
      <div className='text-slate-400 font-bold mt-6'>
        content is loading .....
      </div>
    );
  }

  if (state?.error) {
    content = (
      <div className='text-rose-600 font-bold mt-6'>{state?.error}</div>
    );
  }
  if (state?.isSuccess && state?.blogs && state?.blogs?.length === 0) {
    content = <div>No content found</div>;
  }

  if (state?.isSuccess && state?.blogs && state?.blogs?.length > 0) {
    content = state.blogs.map((blog) => (
      <SearchedBlog data={blog} key={blog?.id} setShowModal={setShowModal} />
    ));
  }

  return (
    <div className=''>
      {state?.searched && (
        <h3 className='text-slate-400 font-bold mt-6'>
          Search Results for{"   "}
          <span className='font-bold'> {` "${state?.searched} "`}</span>
        </h3>
      )}
      <div className='my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain'>
        {content}
      </div>
    </div>
  );
}
