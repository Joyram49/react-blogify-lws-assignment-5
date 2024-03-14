import { actions } from "../../../../actions";
import { useAuthorizedApi } from "../../../../hooks/api/useAuthorizedApi";
import { useSearchedBlogs } from "../../../../hooks/blogs/useSearchedBlogs";

export default function SearchForm() {
  const { dispatch } = useSearchedBlogs();
  const { authorizedApi } = useAuthorizedApi();

  // debounce function
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // Debounced search function
  const doSearch = async (value) => {
    dispatch({
      type: actions.searchedBlogs.DATA_FETCHING,
      searchedText: value,
    });
    try {
      const response = await authorizedApi.get(`search?q=${value}`);
      if (response?.status === 200) {
        dispatch({ type: actions.searchedBlogs.DATA_SUCCEED, data: true });
        dispatch({
          type: actions.searchedBlogs.DATA_FETCHED,
          data: {
            blogs: response?.data?.data,
            searchedText: response?.data?.query,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actions.searchedBlogs.DATA_FETCH_ERROR,
        error: error?.message,
      });
    }
  };
  const handleSearched = debounceHandler(doSearch, 500);

  return (
    <div>
      <h3 className='font-bold text-xl pl-2 text-slate-400 my-2'>
        Search for Your Desire Blogs
      </h3>
      <input
        // value={query}
        onChange={(e) => handleSearched(e.target.value)}
        type='text'
        placeholder='Start Typing to Search'
        className='w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600'
      />
    </div>
  );
}
