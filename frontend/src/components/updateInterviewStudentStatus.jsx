import React, { useEffect } from "react";
import { useGetInterviewByID, useUpdateInterview } from "../hooks/interviews";
import Loader from "./common/Loader";
import { useForm } from "react-hook-form";

const UpdateInterviewStudentStatusForm = ({ id, form_id, onRequestClose }) => {
  const { data: interviewDetails, isLoading: isStudentDetailsLoading } =
    useGetInterviewByID(id);

  const {
    data: updateStudentStatus,
    isLoading,
    isStudentStatusUpdating,
  } = useUpdateInterview();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (interviewDetails?.data) {
      console.log(interviewDetails.data.students);
    }
    return;
  }, [interviewDetails]);

  const onSubmit = (data) => {
    console.log(data, "selected Students");
    // onRequestClose();
  };

  if (isStudentDetailsLoading)
    return (
      <div className="h-56">
        <Loader />
      </div>
    );

  return (
    <>
      <form id={form_id} onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full  font-bold text-xl text-blue-300">
          <label className="inline-block w-2/12">Status</label>
          <label className="inline-block w-4/12">Name</label>
          <label className="inline-block w-6/12">Collage</label>
        </div>
        <div className="w-full text-lg">
          {interviewDetails.data.students.length > 0 &&
            interviewDetails.data?.students?.map((student, index) => (
              <div key={student.id._id}>
                <div className="inline-block w-3/12 pl-5 m-2">
                  <select {...register("status")} defaultValue={student.status}>
                    <option value="On Hold">hold</option>
                    <option value="selected">selected</option>
                    <option value="rejected">rejected</option>
                  </select>
                  {/* <input
                    type="checkbox"
                    value={student.id._id}
                    {...register("test")}
                  /> */}
                </div>
                <label className="w-4/12 inline-block">
                  {student?.id?.name}{" "}
                </label>
                <label className="w-5/12">{student?.id?.collage}</label>
                <hr />
              </div>
            ))}
        </div>
        <input type="submit" />
      </form>
    </>
  );
};

export default UpdateInterviewStudentStatusForm;
