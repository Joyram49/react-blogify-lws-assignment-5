import Blog from "../../blogs/Blog";

export default function MyBlogList({ myBlogs }) {
  if (myBlogs?.length === 0) {
    return <div className='my-6 space-y-4'>No content found</div>;
  }
  return (
    <div className='my-6 space-y-4'>
      {myBlogs?.map((blog) => (
        <Blog key={blog?.id} data={blog} />
      ))}
    </div>
  );
}
