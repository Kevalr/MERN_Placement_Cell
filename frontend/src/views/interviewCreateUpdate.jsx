import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetInterviewByID } from "../hooks/interviews";
import Loader from "../components/common/Loader";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useModal from "../hooks/use-modal";
import StudentsModal from "../components/studentsModal";

const Input = ({ label, name, register, required, placeholder }) => (
  <>
    <div className="w-full px-4">
      <div className="relative w-full mb-3">
        <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          type="text"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          {...register(name, { required })}
          placeholder={placeholder || `Enter ${label}`}
        />
      </div>
    </div>
  </>
);

const InterviewCreateUpdate = () => {
  //Fetching id from the state using location
  const { state } = useLocation();
  console.log(state.id);

  //fetching interview details
  const { data: interviewDetails, isFetching: isInterviewDetailsLoading } =
    useGetInterviewByID(state?.id);

  //   interviewDetails && console.log(interviewDetails);

  //using useForm
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      requiredTechnologies: "",
    },
  });

  const {} = useForm({
    defaultValues: {
      students: [],
    },
  });

  const createRequiredTechString = (requiredTech) => {
    let result = "";
    requiredTech.map((tech) => (result += ` ${tech}`));
    return result;
  };

  const { isOpen, openModal, onRequestClose } = useModal();

  useEffect(() => {
    if (!interviewDetails) {
      return;
    }
    console.log(interviewDetails);
    // reset function is used to reset the form data and it is provided by react-hook-form
    reset({
      name: interviewDetails.data.name,
      requiredTechnogies: createRequiredTechString(
        interviewDetails.data?.requiredTechnogies
      ),
      date: interviewDetails.data.date,
    });
  }, [interviewDetails]);

  const onSubmit = (data) => console.log(data, "form data");

  if (isInterviewDetailsLoading) return <Loader />;

  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-slate-700 shadow- shadow-md rounded-lg bg-blueGray-100 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center text-2xl text-blueGray-400 mt-5 mb-6 font-bold uppercase">
                Interview Information
              </h2>
              <div className="flex flex-wrap">
                <Input
                  label="Interview Name"
                  name="name"
                  register={register}
                  required
                />
                <Input
                  label="Required Technologies"
                  name="requiredTechnogies"
                  register={register}
                  placeholder="Enter Required Technologies Separated By Space"
                />
                <div className="w-full px-4 flex fle justify-between items-center">
                  <div className="relative w-1/3 mb-3">
                    <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2">
                      Interview Date:{" "}
                    </label>
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          calendar
                          className="box-border text-black p-4 h-12 w-full outline-none bg-gray-light rounded border border-solid border-gray-dark focus:ring-offset-0 focus:ring-0 focus:border-gray-dark"
                          dateFormat="dd-MM-yyyy"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          showPopperArrow={false}
                          onChange={(date) => field.onChange(date)}
                        />
                      )}
                    />
                  </div>

                  <div className="relative w-1/3 mb-3 self-end">
                    <button
                      class="px-4 py-3 w-full bg-gray-800 hover:bg-gray-900 hover:scale-110 transition-transform ease-in-out text-white font-medium rounded-md"
                      onClick={openModal}
                    >
                      Select Students &nbsp; &#8594;
                    </button>
                  </div>
                </div>

                <div className="flex justify-center w-full mt-5 ">
                  <div class="border-2 w-1/3 text-center text-lg font-bold hover:border-yellow-600 rounded-lg px-6 py-2 hover:bg-white hover:text-yellow-600 cursor-pointer bg-yellow-600 text-black">
                    <button type="submit">
                      {state.id ? "UPDATE" : "CREATE"} STUDENT
                    </button>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </form>
          </div>
          <StudentsModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <form></form>
          </StudentsModal>
        </div>
      </div>
    </section>
  );
};

export default InterviewCreateUpdate;
