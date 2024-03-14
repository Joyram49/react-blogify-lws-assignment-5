import { useState } from "react";
import { actions } from "../../../actions";
import checkIcon from "../../../assets/icons/check.svg";
import editIcon from "../../../assets/icons/edit.svg";
import { useAuthorizedApi } from "../../../hooks/api/useAuthorizedApi";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useProfile } from "../../../hooks/profile/useProfile";

export default function ProfileBio({ bio, profileId }) {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(bio);
  const { auth } = useAuth();
  const { dispatch } = useProfile();
  const { authorizedApi } = useAuthorizedApi();
  const isMe = auth?.user?.id === profileId;

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await authorizedApi.patch(`/profile`, {
        bio: description,
      });
      if (response?.status === 200) {
        dispatch({
          type: actions.profile.UPDATE_PROFILE,
          data: response?.data?.user?.bio,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error?.message,
      });
    }
  };

  return (
    <div className='mt-4 flex items-start gap-2 lg:mt-6'>
      <div className='flex-1'>
        {!editMode ? (
          <p
            className='leading-[188%] text-gray-400 lg:text-lg'
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        ) : (
          <textarea
            className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={description}
            rows={4}
            cols={55}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
      {!editMode && isMe && (
        <button
          className='flex-center h-7 w-7 rounded-full'
          onClick={() => setEditMode(true)}
        >
          <img src={editIcon} alt='Edit' />
        </button>
      )}
      {editMode && isMe && (
        <button
          className='flex-center h-7 w-7 rounded-full'
          onClick={() => handleBioEdit()}
        >
          <img src={checkIcon} alt='save' />
        </button>
      )}
    </div>
  );
}
