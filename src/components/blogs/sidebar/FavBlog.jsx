import { useNavigate } from "react-router-dom";

export default function FavBlog({ data }) {
  const { id, author, likes, title } = data;

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
      <p className='text-slate-600 text-sm'>#tailwindcss, #server, #ubuntu</p>
    </li>
  );
}
