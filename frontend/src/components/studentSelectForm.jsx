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
    }
    return;
  }, [studentList]);

  const onSubmit = (data) => {
    setSelectedStudentList(data.test);
    console.log(data, "selected Students");
    onRequestClose();
  };
  if (isStudentListLoading) return <Loader />;

  return (
    <>
      <form id={formID} onSubmit={handleSubmit(onSubmit)}>
        {studentListWithSelectedStudent.length > 0 &&
          studentListWithSelectedStudent?.map((student, index) => (
            <>
              <h3>student - {student._id}</h3>
              <input
                key={student._id}
                type="checkbox"
                value={student._id}
                {...register("test")}
              />
              <label>{student.name} </label>
              <label>{student.collage}</label>
              <br />
            </>
          ))}
      </form>
    </>
  );
};

export default StudentSelectForm;
