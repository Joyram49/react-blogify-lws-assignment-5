import { actions } from "../../../actions";
import alertIcon from "../../../assets/icons/alert.svg";
import { useAuthorizedApi } from "../../../hooks/api/useAuthorizedApi";
import { useBlog } from "../../../hooks/blog/useBlog";

export default function DeleteCommentModal({
  setShowModal,
  blogId,
  commentId,
}) {
  const { dispatch } = useBlog();
  const { authorizedApi } = useAuthorizedApi();

  const handleClose = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };
  const handleDeleteComment = async (e) => {
    e.stopPropagation();
    try {
      const response = await authorizedApi.delete(
        `/blogs/${blogId}/comment/${commentId}`
      );
      if (response?.status === 200) {
        dispatch({
          type: actions.blog.ADD_OR_DELETE_COMMENT,
          data: response?.data?.comments,
        });
        setShowModal(false);
      }
    } catch (error) {
      dispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: error?.message,
      });
    }
  };

  return (
    <div className=' w-full h-full fixed inset-0  bg-black/50'>
      <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  w-[400px] h-[200px] p-2 rounded-md bg-gray-200  z-10'>
        <div className='flex justify-start items-center gap-2 pb-3.5 border-b-[1px] border-slate-800/30'>
          <img src={alertIcon} alt='sign-in-alert' className='w-[32px] ' />
          <h1 className='text-gray-600 text-xl font-serif font-semibold'>
            Are you sure?
          </h1>
        </div>

        <div className='mt-6 text-center '>
          <h1 className='text-gray-800 text-base '>
            Are you really want to delete the comment? This process can not be
            undone.
          </h1>
          <div className='flex justify-center items-center gap-x-6'>
            <button
              className='bg-rose-600 px-4 py-1 rounded-sm text-white font-[500] mt-2 font-serif text-xl'
              onClick={(e) => handleDeleteComment(e)}
            >
              Delete
            </button>
            <button
              className='bg-gray-600 px-4 py-1 rounded-sm text-white font-[500] mt-2 font-serif text-xl'
              onClick={(e) => handleClose(e)}
            >
              Cancel
            </button>
          </div>
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
