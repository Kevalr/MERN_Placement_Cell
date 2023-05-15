import React from "react";

const Input = ({
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
          <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2">
            {label}
          </label>
        )}
        <input
          {...props}
          type={type}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          {...register(name, { required })}
          id={name}
          placeholder={placeholder || `Enter ${label}`}
        />
      </div>
    </div>
  </>
);

export default Input;
