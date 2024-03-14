import { useNavigate } from "react-router-dom";
import alertIcon from "../../../assets/icons/alert.svg";

export default function LoginModal({ actionType, setShowModal }) {
  const navigate = useNavigate();

  const handleClose = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };
  const handleLoginClick = (e) => {
    e.stopPropagation();
    navigate("/login");
    setShowModal(false);
  };

  return (
    <div className=' w-full h-full fixed inset-0  bg-black/50'>
      <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  w-[400px] h-[200px] p-2 rounded-md bg-gray-200  z-10'>
        <div className='flex justify-start items-center gap-2 pb-3.5 border-b-[1px] border-slate-800/30'>
          <img src={alertIcon} alt='sign-in-alert' className='w-[32px] ' />
          <h1 className='text-gray-600 text-xl font-serif font-semibold'>
            Login Alert !
          </h1>
        </div>

        <div className='mt-6 text-center '>
          <h1 className='text-gray-800 text-lg '>
            {`Please log in to ${actionType}`}.
          </h1>
          <button
            className='bg-indigo-600 px-4 py-1 rounded-sm text-white font-[500] mt-2 font-serif text-xl'
            onClick={(e) => handleLoginClick(e)}
          >
            log in
          </button>
        </div>
        <div
          className='w-6 absolute top-1 right-2 cursor-pointer'
          onClick={(e) => handleClose(e)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.2}
            stroke='#252'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
