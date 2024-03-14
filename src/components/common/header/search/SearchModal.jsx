import SearchClose from "./SearchClose";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

export default function SearchModal({ setShowModal }) {
  return (
    <section className='absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50'>
      {/* <!-- Search Container --> */}
      <div className='relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10'>
        {/* <!-- Search --> */}
        <SearchForm />

        {/* <!-- Search Result --> */}
        <SearchResult setShowModal={setShowModal} />

        <SearchClose setShowModal={setShowModal} />
      </div>
    </section>
  );
}
