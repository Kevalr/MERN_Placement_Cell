import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCreateInterview,
  useGetInterviewByID,
  useUpdateInterview,
} from "../hooks/interviews";
import Loader from "../components/common/Loader";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useModal from "../hooks/use-modal";
import StudentsModal from "../components/studentsModal";
import StudentSelectForm from "../components/studentSelectForm";
import { invalidateQuery } from "../config/react-query-client";
import { toast } from "react-toastify";
import Input from "../components/common/Input";

const InterviewCreateUpdate = () => {
  //Fetching id from the state using location
  const { state } = useLocation();
  // console.log(state.id);

  const navigate = useNavigate();

  const { mutate: createInterview, isLoading: isInterviewCreating } =
    useCreateInterview();
  const { mutate: updateInterview, isLoading: isInterviewUpdating } =
    useUpdateInterview();

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
      requiredTechnogies: "",
    },
  });

  const [selectedStudentList, setSelectedStudentList] = useState([]);

  const createRequiredTechString = (requiredTech) => {
    let result = "";
    requiredTech.map((tech) => (result += ` ${tech},`));
    return result;
  };

  const createArrayOfcreateRequiredTech = (requiredTechString) => {
    let requiredTech = requiredTechString.split(",");
    let finalRequiredTechList = [];

    for (let index in requiredTech) {
      if (requiredTech[index].length > 0) {
        finalRequiredTechList.push(requiredTech[index].trim());
      }
    }
    return finalRequiredTechList;
  };

  const { isOpen, openModal, onRequestClose } = useModal();

  useEffect(() => {
    if (!interviewDetails?.data) {
      return;
    }
    // reset function is used to reset the form data and it is provided by react-hook-form
    reset({
      name: interviewDetails.data.name,
      requiredTechnogies: createRequiredTechString(
        interviewDetails.data?.requiredTechnogies
      ),
      date: interviewDetails?.data?.date,
    });
    setSelectedStudentList(interviewDetails.data?.students);
  }, [interviewDetails]);

  const onSubmit = (data) => {
    // console.log(
    //   data,
    //   "form data",
    //   selectedStudentList,
    //   createArrayOfcreateRequiredTech(data.requiredTechnogies)
    // );

    const payload = {
      name: data.name,
      date: new Date(`${data.date}`).toISOString(),
      requiredTechnogies: createArrayOfcreateRequiredTech(
        data.requiredTechnogies
      ),
      students: selectedStudentList.map((student) => ({ id: student })),
    };

    console.log(payload);

    if (state.id) {
      updateInterview(
        { ...payload, id: state.id },
        {
          onSuccess: () => {
            invalidateQuery("interviews");
            toast.success("Interview Updated Successfully");
            navigate("/interviews");
          },
        }
      );
    } else {
      createInterview(payload, {
        onSuccess: () => {
          invalidateQuery("interviews");
          toast.success("Interview Created Successfully");
          navigate("/interviews");
        },
      });
    }
  };

  if (isInterviewDetailsLoading) return <Loader />;

  const studentSelect_Form_ID = "selectStudentForm";

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
                  placeholder="Enter Required Technologies Separated By Comma and Space"
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
                      type="button"
                      className="px-4 py-3 w-full bg-blue-500 hover:bg-blue-700 hover:scale-110 transition-transform ease-in-out text-white font-medium rounded-md"
                      onClick={openModal}
                    >
                      Select Students &nbsp; &#8594;
                    </button>
                  </div>
                </div>

                <div className="flex justify-around w-full mt-5 ">
                  <button
                    type="button"
                    className="border-2 w-1/3 font-bold px-6 py-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" flex justify-center items-center border-2 w-1/3 text-center text-md font-bold hover:border-yellow-600 rounded-lg px-6 py-2 hover:bg-white hover:text-yellow-600 cursor-pointer bg-yellow-600 text-black"
                  >
                    {isInterviewUpdating || isInterviewCreating ? (
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-white fill-black"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      (state.id ? "UPDATE" : "CREATE") + " INTERVIEW"
                    )}
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </form>
          </div>

          {isOpen && (
            <StudentsModal
              isOpen={isOpen}
              onRequestClose={onRequestClose}
              submitButtonProps={{
                form: studentSelect_Form_ID,
              }}
            >
              <StudentSelectForm
                onRequestClose={onRequestClose}
                selectedStudentList={selectedStudentList}
                setSelectedStudentList={setSelectedStudentList}
                formID={studentSelect_Form_ID}
              />
            </StudentsModal>
          )}
        </div>
      </div>
    </section>
  );
};

export default InterviewCreateUpdate;
