import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className='notfound-container  flex flex-col items-center justify-center'>
      <div className='max-w-md w-full  p-8 rounded shadow-lg flex flex-col items-center ring-1 ring-gray-800/30 '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='#fff'
          viewBox='0 0 24 24'
          strokeWidth={2.5}
          stroke='#111'
          className='w-16 h-16'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
          />
        </svg>

        <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
          Page Not Found
        </h2>
        <p className='text-gray-600 mb-6 font-semibold'>
          The page you are looking for does not exist.
        </p>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300'
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </main>
  );
};
export default NotFound;
