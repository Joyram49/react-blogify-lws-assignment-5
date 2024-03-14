import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";
import { usePortal } from "../../../hooks/usePortal";
import { getImage } from "../../../utils/getImage";
import DeleteCommentModal from "../../common/modals/DeleteCommentModal";
export default function Comment({ comment, blog }) {
  const { content, author } = comment;
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const fullName = author?.firstName + " " + author?.lastName;
  const isMyComment = author?.id === auth?.user?.id;
  const portalContainer = usePortal();

  return (
    <div className='flex items-start space-x-4 my-8 '>
      <Link to={`/profile/${author?.id}`}>
        <div className='avater-img bg-orange-600 text-white'>
          {author?.avatar ? (
            <img
              src={getImage(author.avatar, "avatar")}
              alt='avatar'
              className='rounded-full w-full h-full object-cover'
            />
          ) : (
            <span>{fullName ? fullName.slice(0, 1) : "guest"}</span>
          )}
          {/* <!-- User's first name initial --> */}
        </div>
      </Link>
      <div className='w-full group'>
        <Link to={`/profile/${author?.id}`}>
          <h5 className='text-slate -500 font-bold  inline'>{fullName}</h5>
        </Link>
        <div className='flex items-end'>
          <p className='text-slate-300'>{content} </p>
          {isMyComment && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500 ml-2 pb-[3px] hover:stroke-rose-500'
              onClick={() => setShowModal(true)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
          )}
        </div>
      </div>
      {showModal &&
        createPortal(
          <DeleteCommentModal
            setShowModal={setShowModal}
            blogId={blog?.id}
            commentId={comment?.id}
          />,
          portalContainer
        )}
    </div>
  );
}
