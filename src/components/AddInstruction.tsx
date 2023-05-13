/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/AddInstruction.module.scss";
import { Course } from "../firebase/courses/addCourse";
import { getAllCourses } from "../firebase/courses/getAllCourses";
import { months } from "../data/months";
import { addTraining, uploadTraining } from "../firebase/training/addTraining";
import { useAuth } from "../providers/auth.provider";
import { toast } from "react-toastify";

type AddInstructionProps = {
  closeModal: () => void;
};

export const AddInstruction = ({ closeModal }: AddInstructionProps) => {
  const currentMonth = new Date().getMonth();
  const [courses, setCourses] = useState<Course[] | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(+new Date().getFullYear());

  const { user } = useAuth();

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const newCourse = courses?.find((course) => course.id === e.target.value);
      if (newCourse) {
        setSelectedCourse(newCourse);
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setMonth(+e.target.value);
    }
  };

  const handleAddInstruction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    if (!selectedCourse) {
      return;
    }

    if (!month || !year) {
      return;
    }

    const newTraining: uploadTraining = {
      apprenticeId: user.id,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      hours: selectedCourse.hours,
      dateCompleted: new Date(year, month - 1),
      supervisorApproval: false,
    };

    try {
      await addTraining(newTraining);
      toast.success("Instruction added successfully");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Instruction");
      throw new Error("Could not add Training");
    }
  };

  useEffect(() => {
    const unsubscribe = getAllCourses(setCourses);
    return () => unsubscribe();
  }, []);
  return (
    <form className={s.addInstruction} onSubmit={handleAddInstruction}>
      <label className={s.label} htmlFor="course">
        Training
        <select
          className={s.input}
          name="course"
          id="course"
          onChange={handleCourseChange}
          value={selectedCourse?.id}
        >
          <option value="">- Select Training</option>
          {courses &&
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
        </select>
      </label>
      <div className={s.dateContainer}>
        <label className={s.label} htmlFor="months">
          Month
          <select
            className={s.input}
            name="month"
            id="month"
            onChange={handleMonthChange}
            value={month}
          >
            <option value="">- Select Month</option>
            {months.map((month) => (
              <option key={month.id} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>
        </label>
        <label className={s.label} htmlFor="year">
          Year
          <input
            className={s.input}
            type="number"
            value={year}
            min="1970"
            max="3000"
            step="1"
            onChange={(e) => setYear(+e.target.value)}
          />
        </label>
      </div>
      <div className={s.submitContainer}>
        <input className={s.submitBtn} type="submit" value="Add Instruction" />
      </div>
    </form>
  );
};
