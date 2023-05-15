import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../hooks/users";
import { toast } from "react-toastify";
import { setSession } from "../utils/helper";

export const Input = ({
  label,
  type = "text",
  name,
  register,
  required,
  placeholder,
  ...props
}) => (
  <>
    <div className="w-full px-4">
      <div className="relative w-full mb-3">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <input
          {...props}
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register(name, { required })}
          id={name}
          placeholder={placeholder || `Enter ${label}`}
        />
      </div>
    </div>
  </>
);

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const {
    mutate: loginUser,
    data: userData,
    isLoading: isUserLoggingIn,
  } = useLoginUser();
  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    loginUser(payload, {
      onSuccess: (response) => {
        toast.success("User Login Succssfull");
        console.log(userData, response);
        setSession(response.data);
        navigate("/interviews");
      },
    });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full bg-gray-800 dark:border-gray-700-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0  shadow-md shadow-slate-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-white md:text-2xl">
              LOGIN
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="Email :"
                type="email"
                name="email"
                register={register}
                required={true}
              />
              <Input
                label="Password :"
                type="password"
                name="password"
                register={register}
                required={true}
              />
              <div className="w-full px-4">
                <button
                  type="submit"
                  className="w-full mb-2 text-black bg-white hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  LOGIN
                </button>
                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                  Not have an account?{" "}
                  <button
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
