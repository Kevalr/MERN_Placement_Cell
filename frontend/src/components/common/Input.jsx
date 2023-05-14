import React from "react";

const Input = ({ label, error, register, name, caption, ...props }) => {
  return (
    <div className="w-full pt-3">
      {label && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        id={name}
        {...register(name)}
      />
      <p className="font-medium text-xs text-gray-darker">{caption}</p>
      <div className="h-6 text-secondary text-xs">{error || ""}</div>
    </div>
  );
};

export default Input;
