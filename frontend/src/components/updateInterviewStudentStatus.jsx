import React, { useEffect } from "react";
import { useGetInterviewByID, useUpdateInterview } from "../hooks/interviews";
import Loader from "./common/Loader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { invalidateQuery } from "../config/react-query-client";

const UpdateInterviewStudentStatusForm = ({ id, form_id, onRequestClose }) => {
  const { data: interviewDetails, isLoading: isStudentDetailsLoading } =
    useGetInterviewByID(id);

  const { mutate: updateStudentStatus, isLoading: isStudentStatusUpdating } =
    useUpdateInterview();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (interviewDetails?.data) {
      console.log(interviewDetails.data.students);
    }
    return;
  }, [interviewDetails]);

  const onSubmit = (data) => {
    console.log(data, "selected Students");
    const students = interviewDetails.data?.students?.map((student) => ({
      id: student.id._id,
      status: data[`${student.id._id}`],
    }));

    const payload = {
      id: id,
      students: students,
    };

    updateStudentStatus(payload, {
      onSuccess: () => {
        onRequestClose();
        toast.success("Student Interview Status");
        invalidateQuery(["interviews", id]);
      },
    });
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
          <label className="inline-block w-3/12 pl-6">Status</label>
          <label className="inline-block w-4/12">Name</label>
          <label className="inline-block w-5/12">Collage</label>
        </div>
        <div className="w-full text-lg">
          {interviewDetails.data.students.length > 0 &&
            interviewDetails.data?.students?.map((student, index) => (
              <div key={student.id._id}>
                <div className="inline-block w-3/12 pl-5 my-2">
                  <select
                    {...register(`${student.id._id}`)}
                    defaultValue={student.status}
                  >
                    <option value="onhold">On-Hold</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <label className="w-4/12 inline-block">
                  {student?.id?.name}{" "}
                </label>
                <label className="w-5/12">{student?.id?.collage}</label>
                <hr />
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default UpdateInterviewStudentStatusForm;
