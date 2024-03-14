import { Link } from "react-router-dom";
import errorImg from "../../assets/system.png";

export default function NoDataFound({ error }) {
  return (
    <div className=' notfound-container h-auto flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src={errorImg} alt='error' className='w-60 h-auto object-cover' />
        <div className='flex mt-6 text-xl'>
          <p className='font-semibold'>{error}. </p>
          <p className='pl-1 font-[400]'>
            Please{" "}
            <Link to='/' className='italic hover:underline hover:text-cyan-500'>
              try
            </Link>{" "}
            again later
          </p>
        </div>
      </div>
    </div>
  );
}
