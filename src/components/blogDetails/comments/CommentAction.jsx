import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import { usePortal } from "../../../hooks/usePortal";
import { getImage } from "../../../utils/getImage";
import LoginModal from "../../common/modals/LoginModal";
import CommentForm from "../../form/CommentForm";

export default function CommentAction({ author }) {
  const { auth } = useAuth();
  const fullName = auth?.user
    ? auth?.user?.firstName + " " + auth?.user?.lastName
    : undefined;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const portalContainer = usePortal();

  const handleNavigate = () => {
    if (fullName === undefined) {
      navigate("/");
      return false;
    }
    navigate(`/profile/${author?.id}`);
  };
  return (
    <div className='flex items -center space-x-4'>
      <div
        className='avater-img bg-indigo-600 text-white cursor-pointer'
        onClick={handleNavigate}
      >
        {auth?.user?.avatar ? (
          <img
            src={getImage(auth.user.avatar, "avatar")}
            alt='avatar'
            className='rounded-full w-full h-full object-cover'
          />
        ) : (
          <span className=''>{fullName ? fullName.slice(0, 1) : "guest"}</span>
        )}
        {/* <!-- User's first name initial --> */}
      </div>
      <CommentForm setShowModal={setShowModal} />

      {showModal &&
        createPortal(
          <LoginModal actionType='comment' setShowModal={setShowModal} />,
          portalContainer
        )}
    </div>
  );
}
