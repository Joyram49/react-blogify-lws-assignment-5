import { Link } from "react-router-dom";
import { getImage } from "../../../../utils/getImage";
import { getTruncateText } from "../../../../utils/getTruncateText";

export default function SearchedBlog({ data, setShowModal }) {
  return (
    <div className='flex gap-6 py-2'>
      {data?.thumbnail && (
        <img
          className='h-28 object-contain max-w-40'
          src={getImage(data.thumbnail, "blog")}
          alt='blog-poster'
        />
      )}
      <div className='mt-2'>
        <Link to={`/blogs/${data?.id}`} onClick={() => setShowModal(false)}>
          <h3 className='text-slate-300 text-xl font-bold'>{data?.title}</h3>
        </Link>
        {/* <!-- Meta Informations --> */}
        <p className='mb-6 text-sm text-slate-500 mt-1'>
          {getTruncateText(data?.content)}
        </p>
      </div>
    </div>
  );
}
