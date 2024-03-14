import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { actions } from "../../actions";
import { useAuthorizedApi } from "../../hooks/api/useAuthorizedApi";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import Field from "./Field";

export default function EditBlogForm({ blog }) {
  const fileUploadRef = useRef();
  const { dispatch } = useBlogs();
  const { authorizedApi } = useAuthorizedApi();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Set initial values when the component mounts
  useEffect(() => {
    setValue("title", blog?.title);
    setValue("tags", blog?.tags);
    setValue("content", blog?.content);
  }, [blog, setValue]);

  const handleImageUpload = () => {
    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = () => {
    const file = fileUploadRef.current.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("image", file);
      setValue("imageUrl", imageUrl);
    }
  };

  const handleFormSubmit = async (data) => {
    if (!data.image && !blog?.thumbnail) {
      setError("root.poster", {
        type: "required",
        message: "blog poster is required!",
      });
      return false;
    }
    const formData = new FormData();
    formData.append("thumbnail", blog.thumbnail);
    if (data.image) {
      formData.append("thumbnail", data.image);
    }
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("content", data.content);
    try {
      const response = await authorizedApi.patch(`/blogs/${blog.id}`, formData);
      if (response?.status === 200) {
        dispatch({
          type: actions.blogs.UPDATE_BLOG,
          data: response?.data,
        });
        navigate(-1);
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: error?.message,
      });
    }
  };

  return (
    <form
      action='#'
      method='PATCH'
      className='createBlog'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className='grid place-items-center  bg-slate-600/20 h-[150px] rounded-md my-4'>
        <div className='flex gap-6'>
          {watch("imageUrl") && (
            <img
              src={watch("imageUrl")}
              alt='selected'
              className='w-32 h-[80%] rounded-md'
            />
          )}
          <div
            className={`flex items-center ${
              watch("imageUrl") ? "gap-1" : "gap-4 "
            } hover:scale-110 transition-all cursor-pointer`}
            onClick={handleImageUpload}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
              />
            </svg>
            <p>
              {watch("imageUrl") ? "Change Your Image" : "Upload Your Image"}
            </p>
          </div>
        </div>
        <Field>
          <input
            type='file'
            name='image'
            id='image'
            ref={fileUploadRef}
            hidden
          />
        </Field>
      </div>
      <p className='text-red-500 font-medium mt-1'>
        {errors?.root?.poster?.message}
      </p>
      <Field error={errors?.title}>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Enter your blog title'
          {...register("title", {
            required: {
              value: true,
              message: `Post must have some title!!`,
            },
          })}
        />
      </Field>

      <Field error={errors?.tags}>
        <input
          type='text'
          id='tags'
          name='tags'
          placeholder='Your Comma Separated Tags Ex. JavaScript, React, Node, Express,'
          {...register("tags", {
            required: {
              value: true,
              message: `Post must have some tags!!`,
            },
          })}
        />
      </Field>

      <Field error={errors?.content}>
        <textarea
          id='content'
          name='content'
          placeholder='Write your blog content'
          rows='8'
          {...register("content", {
            required: {
              value: true,
              message: `Please add some content`,
            },
          })}
        ></textarea>
      </Field>

      <button
        type='submit'
        className='bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200'
        disabled={isSubmitting}
      >
        Update
      </button>
      <p className='text-red-500 font-medium mt-1'>
        {errors?.root?.random?.message}
      </p>
    </form>
  );
}
