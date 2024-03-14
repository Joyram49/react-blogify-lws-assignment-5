export default function BlogPostLoader() {
  return (
    <div className='p-4 bg-gray-900/60 rounded shadow w-[90%]'>
      <div className='animate-pulse flex space-x-6'>
        <div className='rounded-md bg-gray-700 h-36 w-36 mt-6'></div>
        <div className='flex-1 space-y-4 py-1'>
          <div className='h-4 bg-gray-700 rounded w-3/4'></div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-700 rounded'></div>
            <div className='h-4 bg-gray-700 rounded'></div>
            <div className='h-4 bg-gray-700 rounded w-5/6'></div>
            <div className='flex items-center gap-x-4 pt-6 w-full'>
              <div className='rounded-full  bg-gray-700 h-16 w-16'></div>
              <div className='items-start flex flex-col gap-y-2'>
                <div className='h-3 bg-gray-700 rounded w-20'></div>
                <div className='h-3 bg-gray-700 rounded w-36'></div>
              </div>
              <div className=' h-4 bg-gray-700  w-16 rounded-md '></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
