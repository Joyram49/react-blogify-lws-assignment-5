import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { actions } from "../../../actions";
import likeIcon from "../../../assets/icons/like.svg";
import likeFillIcon from "../../../assets/icons/llike-fill.svg";
import { useAuthorizedApi } from "../../../hooks/api/useAuthorizedApi";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useBlog } from "../../../hooks/blog/useBlog";
import { usePortal } from "../../../hooks/usePortal";
import LoginModal from "../../common/modals/LoginModal";

export default function LikeAction({ blog }) {
  const { auth } = useAuth();
  const { state, dispatch } = useBlog();
  const { authorizedApi } = useAuthorizedApi();
  const { likes, id } = blog;
  const [showModal, setShowModal] = useState(false);
  const portalContainer = usePortal();
  const isLiked = likes?.find((like) => like?.id === auth?.user?.id);

  const handleLike = () => {
    if (!auth?.accessToken) {
      setShowModal(true);
      return false;
    }
    toggleLike();
  };

  const toggleLike = async () => {
    try {
      const response = await authorizedApi.post(`/blogs/${id}/like`);
      if (response?.status === 200) {
        dispatch({
          type: actions.blog.TOGGLE_LIKE_BLOG,
          data: {
            likes: response?.data?.likes,
            isLiked: response?.data?.isLiked,
          },
        });
      }
    } catch (error) {
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error?.message });
      toast.error(error?.message, { position: "top-right" });
    }
  };

  return (
    <>
      <li onClick={() => handleLike()}>
        <img src={isLiked ? likeFillIcon : likeIcon} alt='like' />
        <span>{likes?.length}</span>
      </li>

      {showModal &&
        createPortal(
          <LoginModal actionType='like' setShowModal={setShowModal} />,
          portalContainer
        )}
    </>
  );
}
