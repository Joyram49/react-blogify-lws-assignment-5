import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/api/useApi";
import { useAuth } from "../../hooks/auth/useAuth";
import Field from "./Field";

export default function LoginForm() {
  const { api } = useApi();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const handleLoginSubmit = async (data) => {
    try {
      const response = await api.post(`/auth/login`, data);
      if (response?.status === 200) {
        const {
          token: { accessToken, refreshToken },
          user,
        } = response.data;
        const authInfo = { accessToken, refreshToken, user };
        localStorage.setItem("authInfo", JSON.stringify(authInfo));
        setAuth({ ...authInfo });
        navigate("/", { replace: true });
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: error?.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <Field label='Email' error={errors.email}>
        <input
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email is invalid",
            },
          })}
          type='email'
          id='email'
          name='email'
          className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none focus:border-indigo-500  ${
            errors.email ? "border-red-500" : "border-white/20"
          }`}
        />
      </Field>

      <Field label='Password' error={errors.password}>
        <input
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            maxLength: {
              value: 20,
              message: "Maximum  20 characters",
            },
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          type='password'
          id='password'
          name='password'
          className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none focus:border-indigo-500  ${
            errors.email ? "border-red-500" : "border-white/20"
          }`}
        />
      </Field>

      <div className='mb-6'>
        <button
          type='submit'
          className='w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200'
          disabled={isSubmitting}
        >
          Login
        </button>
      </div>
      <p className='text-red-500 font-medium mt-1'>
        {errors?.root?.random?.message}
      </p>
      <p className='text-center'>
        {`Don't`} have an account?
        <Link to='/register' className='text-indigo-600 hover:underline'>
          Register
        </Link>
      </p>
    </form>
  );
}