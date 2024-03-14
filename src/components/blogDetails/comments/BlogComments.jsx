import Comment from "./Comment";
import CommentAction from "./CommentAction";

export default function BlogComments({ blog }) {
  const { comments, author } = blog;

  return (
    <section id='comments'>
      <div className='mx-auto w-full md:w-10/12 container'>
        <h2 className='text-3xl font-bold my-8'>
          Comments ({comments?.length})
        </h2>
        <CommentAction author={author} />
        {/* <!-- Comments --> */}
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} blog={blog} />
        ))}
      </div>
    </section>
  );
}
