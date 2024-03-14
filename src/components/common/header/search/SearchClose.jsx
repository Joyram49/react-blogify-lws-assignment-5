import { actions } from "../../../../actions";
import closeIcon from "../../../../assets/icons/close.svg";
import { useSearchedBlogs } from "../../../../hooks/blogs/useSearchedBlogs";

export default function SearchClose({ setShowModal }) {
  const { dispatch } = useSearchedBlogs();
  const handleClose = () => {
    dispatch({
      type: actions.searchedBlogs.DATA_FETCHED,
      data: {
        blogs: [],
        searchedText: "",
      },
    });
    dispatch({
      type: actions.searchedBlogs.DATA_SUCCEED,
      data: false,
    });
    setShowModal(false);
  };
  return (
    <button onClick={handleClose}>
      <img
        src={closeIcon}
        alt='Close'
        className='absolute right-2 top-2 cursor-pointer w-8 h-8'
      />
    </button>
  );
}
