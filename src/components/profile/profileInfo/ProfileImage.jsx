import { useRef } from "react";
import { actions } from "../../../actions";
import editIcon from "../../../assets/icons/edit.svg";
import { useAuthorizedApi } from "../../../hooks/api/useAuthorizedApi";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useProfile } from "../../../hooks/profile/useProfile";
import { getImage } from "../../../utils/getImage";

export default function ProfileImage({ firstName, avatar, profileId }) {
  const { auth, setAuth } = useAuth();
  const { dispatch } = useProfile();
  const { authorizedApi } = useAuthorizedApi();
  const fileUploaderRef = useRef();
  const isMe = auth?.user?.id === profileId;

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await authorizedApi.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      );
      if (response?.status === 200) {
        dispatch({
          type: actions.profile.UPLOAD_AVATAR,
          data: response?.data?.user,
        });
        const localAuth = JSON.parse(localStorage.getItem("authInfo"));
        const nextAuth = {
          ...localAuth,
          user: { ...localAuth.user, avatar: response?.data?.user?.avatar },
        };
        localStorage.setItem("authInfo", JSON.stringify(nextAuth));
        setAuth({ ...nextAuth });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className='relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]'>
      <div className='w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full'>
        {avatar ? (
          <img
            src={getImage(avatar, "avatar")}
            alt='avatar'
            className='rounded-full w-full h-full object-cover'
          />
        ) : (
          <span className=''>{firstName.slice(0, 1)}</span>
        )}
        {/* <!-- User's first name initial --> */}
      </div>

      {isMe && (
        <form id='form' encType='multipart/form-data'>
          <button
            className='grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80'
            type='submit'
            onClick={handleImageUpload}
          >
            <img src={editIcon} alt='Edit' />
          </button>
          <input id='file' type='file' ref={fileUploaderRef} hidden />
        </form>
      )}
    </div>
  );
}
