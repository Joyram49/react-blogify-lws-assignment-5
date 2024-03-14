import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { useAuthorizedApi } from "../../hooks/api/useAuthorizedApi";
import { useAuth } from "../../hooks/auth/useAuth";
import { useBlog } from "../../hooks/blog/useBlog";
import Field from "./Field";

export default function CommentForm({ setShowModal }) {
  const { auth } = useAuth();
  const { dispatch } = useBlog();
  const { authorizedApi } = useAuthorizedApi();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();
  const { blogId } = useParams();

  const handleCommentSubmit = (data) => {
    if (!auth?.accessToken) {
      setShowModal(true);
      return false;
    }
    addComment(data);
  };

  const addComment = async (data) => {
    try {
      const response = await authorizedApi.post(
        `/blogs/${blogId}/comment`,
        data
      );
      if (response?.status === 200) {
        dispatch({
          type: actions.blog.ADD_OR_DELETE_COMMENT,
          data: response?.data?.comments,
        });
      }
      reset();
    } catch (error) {
      dispatch({
        type: actions.blog.DATA_FETCH_ERROR,
        error: error?.message,
      });
      toast.error(error?.message, { position: "top-right" });
    }
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(handleCommentSubmit)}>
      <Field error={errors?.content}>
        <textarea
          {...register("content", {
            required: {
              value: true,
              message: "Comment can't be empty",
            },
          })}
          className={`w-full bg-[#030317] border  text-slate-300 p-4 rounded-md focus:outline-none ${
            errors?.content ? "border-red-500" : "border-slate-500"
          }`}
          placeholder='Write a comment'
          type='text'
          id='content'
          name='content'
        />
      </Field>
      <div className='relative  inline-block float-end mt-4 group'>
        <button
          className={`bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200 `}
          disabled={isSubmitting}
          type='submit'
        >
          Comment
        </button>
        {!auth?.accessToken && (
          <div className='opacity-0 bg-gray-800 text-white text-center rounded-md p-2 absolute top-1/2 -left-[100%]  transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 '>
            Please login to comment!
          </div>
        )}
      </div>
      <p className='text-red-500 font-medium mt-1'>
        {errors?.root?.random?.message}
      </p>
    </form>
  );
}
