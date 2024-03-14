import { useState } from "react";
import { createPortal } from "react-dom";
import searchIcon from "../../../../assets/icons/search.svg";
import { usePortal } from "../../../../hooks/usePortal";
import SearchModal from "./SearchModal";

export default function Search() {
  const [showModal, setShowModal] = useState(false);
  const portalContainer = usePortal();

  return (
    <>
      <li onClick={() => setShowModal(true)}>
        <div className='flex items-center gap-2 cursor-pointer'>
          <img src={searchIcon} alt='Search' />
          <span>Search</span>
        </div>
      </li>
      {/* {showModal && (
        <Portal>
          <SearchModal setShowModal={setShowModal} />
        </Portal>
      )} */}

      {showModal &&
        createPortal(
          <SearchModal setShowModal={setShowModal} />,
          portalContainer
        )}
    </>
  );
}
