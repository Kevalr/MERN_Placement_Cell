import React, { useEffect, useState } from "react";
import { useGetAllStudents } from "../hooks/students";
import Loader from "./common/Loader";
import { useForm } from "react-hook-form";

const StudentSelectForm = ({
  onRequestClose,
  selectedStudentList,
  setSelectedStudentList,
  formID,
}) => {
  //fetching Students List to select while creating interview
  let { data: studentList, isLoading: isStudentListLoading } =
    useGetAllStudents();

  const {
    reset,
    register,
    handleSubmit,
    // reset: resetStudents,
  } = useForm({
    mode: "onChange",
  });

  //pela selected add kari devana, pachi normal add karavana , if ae student already selected ma na hoy to
  const [studentListWithSelectedStudent, setStudentListWithSelectedStudent] =
    useState([]);

  const formatStudentList = () => {
    debugger;
    let formattedStudentDetailsList = selectedStudentList.map((student) => ({
      ...student.id,
      selected: true,
    }));

    for (let student of studentList.data) {
      let res = formattedStudentDetailsList.some(
        (formattedStudent) => formattedStudent._id === student._id
      );

      if (!res) {
        formattedStudentDetailsList.push({ ...student, selected: false });
      }
    }

    setStudentListWithSelectedStudent(formattedStudentDetailsList);

    //filtering the selected students and then returning its id to test using map method
    reset({
      test: formattedStudentDetailsList
        .filter((student) => student.selected === true)
        .map((student) => student._id),
    });
  };

  useEffect(() => {
    if (studentList?.data.length > 0 && selectedStudentList?.length > 0) {
      formatStudentList();
    } else if (studentList?.data.length > 0) {
      setStudentListWithSelectedStudent(studentList.data);
    }
    return;
  }, [studentList]);

  const onSubmit = (data) => {
    setSelectedStudentList(data.test);
    console.log(data, "selected Students");
    onRequestClose();
  };
  if (isStudentListLoading)
    return (
      <div className="h-56">
        <Loader />
      </div>
    );

  return (
    <>
      <form id={formID} onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full  font-bold text-xl text-blue-300">
          <label className="inline-block w-2/12">Status</label>
          <label className="inline-block w-4/12">Name</label>
          <label className="inline-block w-6/12">Collage</label>
        </div>
        <div className="w-full text-lg">
          {studentListWithSelectedStudent.length > 0 &&
            studentListWithSelectedStudent?.map((student, index) => (
              <div key={student._id}>
                <div className="inline-block w-2/12 pl-5 m-2">
                  <input
                    type="checkbox"
                    value={student._id}
                    {...register("test")}
                  />
                </div>
                <label className="w-4/12 inline-block">{student.name} </label>
                <label className="w-6/12">{student.collage}</label>
                <hr />
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default StudentSelectForm;
