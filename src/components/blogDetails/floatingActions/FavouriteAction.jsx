import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { actions } from "../../../actions/index.js";
import heartFilledIcon from "../../../assets/icons/heart-filled.svg";
import heartIcon from "../../../assets/icons/heart.svg";
import { useAuthorizedApi } from "../../../hooks/api/useAuthorizedApi.js";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useBlog } from "../../../hooks/blog/useBlog.js";
import { usePortal } from "../../../hooks/usePortal.jsx";
import LoginModal from "../../common/modals/LoginModal.jsx";

export default function FavouriteAction({ blog }) {
  const [showModal, setShowModal] = useState(false);
  const portalContainer = usePortal();
  const { auth, setAuth } = useAuth();
  const { authorizedApi } = useAuthorizedApi();
  const { dispatch } = useBlog();
  const { id } = blog;
  const isMyFavourite = auth?.user?.favourites.find((fav) => fav?.id === id);

  const handleFavourites = () => {
    if (!auth?.accessToken) {
      setShowModal(true);
      return false;
    }
    toggleFavourite();
  };

  const toggleFavourite = async () => {
    try {
      const response = await authorizedApi.patch(`/blogs/${id}/favourite`);
      if (response?.status === 200) {
        dispatch({
          type: actions.blog.TOGGLE_FAVOURITE_BLOG,
          data: response?.data,
        });
        const localAuth = JSON.parse(localStorage.getItem("authInfo"));
        const favouriteBlog = {
          id: response?.data?.id,
          tags: response?.data?.tags,
          title: response?.data?.title,
        };
        let nextAuth = {};
        if (response?.data?.isFavourite) {
          nextAuth = {
            ...localAuth,
            user: {
              ...localAuth.user,
              favourites: [...localAuth.user.favourites, favouriteBlog],
            },
          };
        } else {
          nextAuth = {
            ...localAuth,
            user: {
              ...localAuth.user,
              favourites: localAuth.user.favourites.filter(
                (fav) => fav.id !== favouriteBlog.id
              ),
            },
          };
        }
        localStorage.setItem("authInfo", JSON.stringify(nextAuth));
        setAuth({ ...nextAuth });
      }
    } catch (error) {
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error?.message });
      toast.error(error?.message, { position: "top-right" });
    }
  };

  return (
    <>
      <li onClick={() => handleFavourites()}>
        {/* <!-- There is heart-filled.svg in the icons folder --> */}
        <img
          src={isMyFavourite ? heartFilledIcon : heartIcon}
          alt='Favourite'
        />
      </li>
      {/* {showModal && (
        <Portal>
          <LoginModal setShowModal={setShowModal} actionType='add favourite' />
        </Portal>
      )} */}
      {showModal &&
        createPortal(
          <LoginModal actionType='add favourite' setShowModal={setShowModal} />,
          portalContainer
        )}
    </>
  );
}
