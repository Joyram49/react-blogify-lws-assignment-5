import { Link } from "react-router-dom";
import emptyImg from "../../assets/shopping.png";

export default function NoDataFound() {
  return (
    <div className=' notfound-container h-auto flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img
          src={emptyImg}
          alt='no-data'
          className='w-60 h-auto object-cover'
        />
        <div className='flex mt-6 text-xl'>
          <p className='font-semibold'>No Data found. </p>
          <p className='pl-1 font-[400]'>
            Please{" "}
            <Link
              to='/blogs/create-blog'
              className='italic hover:underline hover:text-cyan-500'
            >
              create
            </Link>{" "}
            a new blog
          </p>
        </div>
      </div>
    </div>
  );
}
