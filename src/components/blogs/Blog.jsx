import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";
import { getDate } from "../../utils/getDate";
import { getFormatedLike } from "../../utils/getFormatedLike";
import { getImage } from "../../utils/getImage";
import { getTruncateText } from "../../utils/getTruncateText";
import ThreeDotsAction from "./ThreeDotsAction";
import ThreeDotsModal from "./ThreeDotsModal";

export default function Blog({ data }) {
  const [isActive, setIsActive] = useState(false);
  const { auth } = useAuth();
  const { author, thumbnail, createdAt, content, title, likes, id } = data;
  const fullName = author?.firstName + " " + author?.lastName;
  const isMyPost = auth?.user?.id === author?.id;
  let avatar = null;
  if (isMyPost) {
    avatar = auth?.user?.avatar ?? author?.avatar;
  } else {
    avatar = author?.avatar;
  }

  const navigate = useNavigate();

  // handle go to single blog or profile function
  const handleBlogClick = (e) => {
    if (e.target.tagName === "H5") {
      navigate(`/profile/${author?.id}`);
      return false;
    }
    navigate(`/blogs/${id}`);
  };

  const handleDotAction = (e) => {
    e.stopPropagation();
    setIsActive((prev) => !prev);
  };

  return (
    <div className='blog-card' onClick={handleBlogClick}>
      <img
        className='blog-thumb'
        src={getImage(thumbnail, "blog")}
        alt='poster'
      />
      <div className='mt-2 relative'>
        <h3 className='text-slate-300 text-xl lg:text-2xl'>{title}</h3>
        <p className='mb-6 text-base text-slate-500 mt-1'>
          {getTruncateText(content, 30)}
        </p>

        {/* <!-- Meta Informations --> */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center capitalize space-x-2'>
            <div className='avater-img bg-indigo-600 text-white'>
              {avatar ? (
                <img
                  src={getImage(avatar, "avatar")}
                  alt='avatar'
                  className='rounded-full w-full h-full object-cover'
                />
              ) : (
                <span className=''>{fullName.slice(0, 1)}</span>
              )}
            </div>

            <div>
              <h5 className='text-slate-500 text-sm'>{fullName}</h5>
              <div className='flex items-center text-xs text-slate-700'>
                <span>{getDate(createdAt)}</span>
              </div>
            </div>
          </div>

          <div className='text-sm px-2 py-1 text-slate-700'>
            <span>{getFormatedLike(likes?.length)}</span>
          </div>
        </div>

        {/* <!-- action dot --> */}
        {isMyPost && <ThreeDotsAction onDotsClick={handleDotAction} />}

        {/* <!-- Action Menus Popup -->*/}
        {isActive && <ThreeDotsModal blogId={id} />}

        {/* <!-- action dot ends --> */}
      </div>
    </div>
  );
}
