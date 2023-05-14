import React, { useRef, useState } from "react";
import { useCreateStudent } from "../hooks/students";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentCreateUpdateForm = () => {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const collageRef = useRef("");
  const reactRef = useRef("");
  const dsaRef = useRef(0);
  const webDevRef = useRef(0);
  const [status, setstatus] = useState("not-placed");

  const { mutate: createStudent, isLoading: isStudentCreating } =
    useCreateStudent();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(
      nameRef.current.value,
      collageRef.current.value,
      dsaRef.current.value,
      webDevRef.current.value,
      reactRef.current.value,
      status
    );

    let payload = {
      name: nameRef.current.value,
      collage: collageRef.current.value,
      status: status,
      scores: {
        dsa: dsaRef.current.value,
        webdev: webDevRef.current.value,
        react: reactRef.current.value,
      },
    };

    createStudent(payload, {
      onSuccess: () => {
        invalidateQuery(["students"]);
        toast.success("Student Creating Successfully");
        navigate("/dashboard");
      },
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900 h-full">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white text-center">
          ADD STUDENT
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                NAME :
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Student name"
                ref={nameRef}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="collage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                COLLAGE :
              </label>
              <input
                type="text"
                name="collage"
                id="collage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Student collage"
                ref={collageRef}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label
                    for="collage"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    DSA SCORE :
                  </label>
                  <input
                    type="number"
                    name="collage"
                    id="collage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="DSA Score"
                    ref={dsaRef}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    for="collage"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    WEB DEVELOPMENT SCORE :
                  </label>
                  <input
                    type="number"
                    name="collage"
                    id="collage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Web Dev Score"
                    ref={webDevRef}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    for="collage"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    REACT SCORE :
                  </label>
                  <input
                    type="number"
                    name="collage"
                    id="collage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="React Score"
                    ref={reactRef}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center">
                <label
                  for="collage"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  STATUS :
                </label>
                <span className="ml-16 flex items-center">
                  <input
                    type="radio"
                    value="placed"
                    checked={status === "placed"}
                    onChange={(e) => setstatus(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="status-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Placed
                  </label>
                </span>
                <span className="ml-16 flex items-center">
                  <input
                    type="radio"
                    value="notPlaced"
                    checked={status === "notPlaced"}
                    onChange={(e) => setstatus(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="status-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Not Placed
                  </label>
                </span>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2 mt-10">
            <div className="flex items-center justify-around">
              <button
                type="button"
                className="w-1/3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                ADD STUDENT
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentCreateUpdateForm;
