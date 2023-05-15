/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/AddInstruction.module.scss";
import { Course } from "../firebase/courses/addCourse";
import { getAllCourses } from "../firebase/courses/getAllCourses";
import { months } from "../data/months";
import {
  addTrainingToDB,
  UploadTraining,
} from "../firebase/training/addTraining";
import { useAuth } from "../providers/auth.provider";
import { toast } from "react-toastify";
import { User } from "../types/user.type";
import {
  TrainingData,
  fetchApprenticeTrainingData,
} from "../firebase/courses/fetchApprenticeTrainingData";
import { ApprenticeData } from "../firebase/mpr/getApprenticeData";

type AddTrainingProps = {
  closeModal: () => void;
  apprentices: User[];
};

export const AddTraining = ({ closeModal, apprentices }: AddTrainingProps) => {
  const currentMonth = new Date().getMonth();
  const [courses, setCourses] = useState<Course[] | null>(null);

  const [selectedApprentice, setSelectedApprentice] = useState<User | null>(
    null
  );
  const [selectedApprenticeCourses, setSelectedApprenticeCourses] =
    useState<TrainingData | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(+new Date().getFullYear());

  const { user } = useAuth();

  console.log({ selectedApprenticeCourses });

  const handleApprenticeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const newApprentice = apprentices.find(
        (app) => app.id === e.target.value
      );
      if (newApprentice) {
        setSelectedApprentice(newApprentice);
        const apprenticeCourses = selectedApprenticeCourses?.trainings.map(
          (training) => training.id
        );
        const validCourses = courses?.filter(
          (course) => !apprenticeCourses?.includes(course.id)
        );
        if (validCourses) {
          setCourses(validCourses);
        }
      }
    }
  };

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

    if (!selectedApprentice) {
      return;
    }

    if (!selectedCourse) {
      return;
    }

    if (!month || !year) {
      return;
    }

    const newTraining: UploadTraining = {
      apprenticeId: selectedApprentice.id,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      hours: selectedCourse.hours,
      dateCompleted: new Date(year, month - 1),
    };

    console.log({ newTraining });

    // try {
    //   await addTrainingToDB(newTraining);
    //   toast.success("Instruction added successfully");
    //   closeModal();
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to add Instruction");
    //   throw new Error("Could not add Training");
    // }
  };

  useEffect(() => {
    if (selectedApprentice) {
      const unsubscribe = fetchApprenticeTrainingData(
        selectedApprentice.id,
        setSelectedApprenticeCourses
      );
      return () => unsubscribe();
    }
  }, [selectedApprentice]);

  useEffect(() => {
    const unsubscribe = getAllCourses(setCourses);
    return () => unsubscribe();
  }, []);

  return (
    <form className={s.addInstruction} onSubmit={handleAddInstruction}>
      <label className={s.label} htmlFor="apprentice">
        Apprentice
        <select
          name="apprentice"
          id="apprentice"
          className={s.input}
          value={selectedApprentice?.id}
          onChange={handleApprenticeChange}
        >
          <option value="">- Select Apprentice</option>
          {apprentices.map((app) => (
            <option key={app.id} value={app.id}>
              {app.name}
            </option>
          ))}
        </select>
      </label>
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
