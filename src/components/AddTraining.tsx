/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/AddInstruction.module.scss";
import { months } from "../data/months";
import { addTrainingToDB } from "../firebase/training/addTrainingToDB";
import { useAuth } from "../providers/auth.provider";
import { toast } from "react-toastify";
import { User } from "../types/user.type";
import { getApprenticeCourses } from "../firebase/courses/fetchApprenticeTrainingData";
import { Course } from "../types/course.type";
import { getAllCourses } from "../firebase/training/getAllCourses";
import { Training, UploadTraining } from "../types/training.type";
import { displayDate } from "../utils/displayDate";
import { getUserById } from "../fetch/auth/getUserById";
import { capitalizeName } from "../utils/capitalizeName";

type AddTrainingProps = {
  closeModal: () => void;
  supervisor: boolean;
  apprentices?: User[];
  training?: Training;
  apprentice?: User;
};

export const AddTraining = ({
  closeModal,
  supervisor,
  apprentices,
  training,
  apprentice,
}: AddTrainingProps) => {
  const { user } = useAuth();
  const currentMonth = new Date().getMonth();
  const [courses, setCourses] = useState<Course[] | null>(null);

  const [selectedApprentice, setSelectedApprentice] = useState<User | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(
    training ? training.courseCompleted : null
  );
  const [month, setMonth] = useState(
    training ? training.dateCompleted.toDate().getMonth() + 1 : currentMonth
  );
  const [year, setYear] = useState(
    training?.dateCompleted.toDate().getFullYear() || +new Date().getFullYear()
  );

  const [supervisorData, setSupervisorData] = useState<User | null>(null);

  const getUncompletedCourses = async (apprenticeId: string) => {
    const coursesCompleted = await getApprenticeCourses(apprenticeId);
    if (!coursesCompleted) {
      return;
    }
    const apprenticeCourseIds = coursesCompleted.map(
      (training) => training.courseCompleted.id
    );
    if (!courses) {
      return;
    }

    const validCourses = courses.filter(
      (course) => !apprenticeCourseIds.includes(course.id)
    );

    if (validCourses) {
      setCourses(validCourses);
    }
  };

  if (apprentice) {
    getUncompletedCourses(apprentice.id);
  }

  const handleApprenticeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value) {
      const newApprentice = apprentices?.find(
        (app) => app.id === e.target.value
      );
      if (newApprentice) {
        setSelectedApprentice(newApprentice);
        getUncompletedCourses(newApprentice.id);
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

  const uploadTraining = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.log("no user");

      return;
    }

    if (!selectedApprentice) {
      console.log("no apprentice");
      return;
    }

    if (!selectedCourse) {
      console.log("no course");
      return;
    }

    if (!month || !year || !selectedApprentice.supervisorId) {
      console.log("no date");
      return;
    }

    if (training) {
      const newTraining: UploadTraining = {
        apprenticeId: selectedApprentice.id,
        courseCompleted: selectedCourse,
        dateCompleted: new Date(year, month - 1),
        dateApproved: new Date(),
        supervisorSignature: supervisor,
        supervisorId: selectedApprentice.supervisorId,
      };

      await addTrainingToDB(newTraining);
      toast.success("Related Training added successfully");
      return closeModal();
    }

    const newTraining: UploadTraining = {
      apprenticeId: selectedApprentice.id,
      courseCompleted: selectedCourse,
      dateApproved: null,
      dateCompleted: new Date(year, month - 1),
      supervisorSignature: supervisor,
      supervisorId: selectedApprentice.supervisorId,
    };

    try {
      await addTrainingToDB(newTraining);
      toast.success("Related Training added successfully");
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

  useEffect(() => {
    if (user && !supervisor) {
      setSelectedApprentice(user);
    }
  }, []);

  useEffect(() => {
    if (training && training.supervisorId) {
      getUserById(training.supervisorId, setSupervisorData);
    }
  }, [training?.supervisorId]);

  return (
    <form className={s.addInstruction} onSubmit={uploadTraining}>
      {supervisor && (
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
            {apprentices?.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name}
              </option>
            ))}
          </select>
        </label>
      )}
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
      {training?.supervisorSignature && (
        <div className={s.approvalInfo}>
          Approved by {capitalizeName(supervisorData?.name)}
          {displayDate(training.dateCompleted)}
        </div>
      )}
      {!training?.supervisorSignature && (
        <div className={s.submitContainer}>
          <input
            className={s.submitBtn}
            type="submit"
            value="Add Instruction"
          />
        </div>
      )}
    </form>
  );
};
