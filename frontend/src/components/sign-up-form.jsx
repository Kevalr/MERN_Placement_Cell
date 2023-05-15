import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./login-form";
import { useForm } from "react-hook-form";
import { useCreateUser } from "../hooks/users";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { mutate: createUser, isLoading: isUserCreating } = useCreateUser();

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    console.log(payload);
    createUser(payload, {
      onSuccess: () => {
        invalidateQuery("users");
        toast.success("Account Created Succesfully");
        navigate("/login");
      },
    });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              REGISTER
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="Username :"
                type="text"
                name="username"
                register={register}
                required={true}
              />
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
                  REGISTER
                </button>
                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => navigate("/login")}
                  >
                    login
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

export default Register;
