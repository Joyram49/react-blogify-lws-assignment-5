import { Link, useNavigate } from "react-router-dom";
import { getFormatedLike } from "../../../utils/getFormatedLike";

export default function PopularBlog({ data }) {
  const { id, author, likes, title } = data;
  const fullName = author?.firstName + " " + author?.lastName;
  const navigate = useNavigate();

  // handle go to single blog  function
  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <li>
      <h3
        className='text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer'
        onClick={() => handleBlogClick(id)}
      >
        {title}
      </h3>
      <p className='text-slate-600 text-sm'>
        by
        <Link
          to={`/profile/${author?.id}`}
          className='hover:text-slate-300 transition-all cursor-pointer'
        >
          {" "}
          {fullName}
        </Link>
        <span className='dot'>·</span> {getFormatedLike(likes?.length)}
      </p>
    </li>
  );
}
