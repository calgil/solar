/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/AddInstruction.module.scss";
import { Course } from "../firebase/courses/addCourse";
import { getAllCourses } from "../firebase/courses/getAllCourses";
import { months } from "../data/months";
export const AddInstruction = () => {
  const currentMonth = new Date().getMonth();
  const [courses, setCourses] = useState<Course[] | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(+new Date().getFullYear());

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

  const handleAddInstruction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("add instr", { selectedCourse, month, year });
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
