import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import { usePortal } from "../../hooks/usePortal";
import DeleteModal from "../common/modals/DeleteModal";

export default function ThreeDotsModal({ blogId }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const portalContainer = usePortal();

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/blogs/${blogId}/edit`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <div className='action-modal-container'>
      <button
        className='action-menu-item hover:text-lwsGreen'
        onClick={(e) => handleEditClick(e)}
      >
        <img src={editIcon} alt='Edit' />
        Edit
      </button>
      <button
        className='action-menu-item hover:text-red-500'
        onClick={(e) => handleDeleteClick(e)}
      >
        <img src={deleteIcon} alt='Delete' />
        Delete
      </button>
      {showModal &&
        createPortal(
          <DeleteModal setShowModal={setShowModal} blogId={blogId} />,
          portalContainer
        )}
    </div>
  );
}
