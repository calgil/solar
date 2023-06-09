/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/AddTraining.module.scss";
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
import { UploadFile } from "./UploadFile";
import { updateTraining } from "../firebase/training/updateTraining";
import classNames from "classnames/bind";
import { deleteRecord } from "../firebase/training/deleteRecord";
import { deleteFile } from "../firebase/mpr/deleteFile";

const cx = classNames.bind(s);

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
    training?.courseCompleted || null
  );
  const [month, setMonth] = useState(
    (training && training.dateCompleted.toDate().getMonth() + 1) || currentMonth
  );
  const [year, setYear] = useState(
    training?.dateCompleted.toDate().getFullYear() || +new Date().getFullYear()
  );

  const [apprenticeSignature, setApprenticeSignature] = useState(false);
  const [supervisorSignature, setSupervisorSignature] = useState(false);

  const [supervisorData, setSupervisorData] = useState<User | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    training?.photoUrl || null
  );
  const [photoPath, setPhotoPath] = useState("");

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

  const handleApprenticeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value) {
      const newApprentice = apprentices?.find(
        (app) => app.id === e.target.value
      );
      if (newApprentice) {
        setSelectedApprentice(newApprentice);
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

  const handlePhotoChange = (
    url: string | null,
    folder: string,
    fileName: string
  ) => {
    setPhotoUrl(url);
    setPhotoPath(`${folder}/${fileName}`);
  };

  const handleDeleteTraining = () => {
    window.confirm(
      "Are you sure you want to delete the training? This action is irreversible"
    );
    if (!training) {
      return;
    }
    deleteRecord("trainings", training.id);
    deleteFile(training.photoPath);
  };

  const uploadTraining = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitted(true);
    if (!user) {
      return;
    }

    if (!selectedCourse || !photoUrl) {
      return;
    }

    if (!month || !year) {
      return;
    }

    if (!photoUrl) {
      return;
    }

    if (training) {
      const updatedTraining: UploadTraining = {
        apprenticeId: training.apprenticeId,
        apprenticeName: training.apprenticeName,
        courseCompleted: selectedCourse,
        dateCompleted: new Date(year, month - 1),
        photoUrl: photoUrl,
        photoPath,
        dateApproved: new Date(),
        supervisorSignature: supervisorSignature,
        supervisorId: training.supervisorId,
      };

      try {
        updateTraining(training.id, updatedTraining);
        toast.success("Related Training updated successfully");
        return closeModal();
      } catch (error) {
        console.error(error);
        toast.error("Could not update training");
      }
    }

    if (supervisor && selectedApprentice) {
      if (!selectedApprentice.supervisorId) {
        return;
      }
      const newTraining: UploadTraining = {
        apprenticeId: selectedApprentice.id,
        apprenticeName: selectedApprentice.name,
        courseCompleted: selectedCourse,
        dateCompleted: new Date(year, month - 1),
        photoUrl: photoUrl,
        photoPath,
        dateApproved: null,
        supervisorSignature: supervisorSignature,
        supervisorId: selectedApprentice.supervisorId,
      };

      try {
        await addTrainingToDB(newTraining);
        toast.success("Related Training added successfully");
        return closeModal();
      } catch (error) {
        console.error(error);
        toast.error("Failed to add Instruction");
        throw new Error("Could not add Training");
      }
    }

    if (!user.supervisorId) {
      return;
    }

    const newTraining: UploadTraining = {
      apprenticeId: user.id,
      apprenticeName: user.name,
      courseCompleted: selectedCourse,
      dateCompleted: new Date(year, month - 1),
      photoUrl: photoUrl,
      photoPath,
      dateApproved: null,
      supervisorSignature: false,
      supervisorId: user.supervisorId,
    };

    try {
      await addTrainingToDB(newTraining);
      toast.success("Related Training added successfully");
      return closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Training");
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
    if (apprentice) {
      getUncompletedCourses(apprentice.id);
    }
  }, [apprentice]);

  useEffect(() => {
    if (training && training.supervisorId) {
      getUserById(training.supervisorId, setSupervisorData);
    }
  }, [training?.supervisorId]);

  const signatureClass = cx({
    label: true,
    checkbox: true,
  });

  const supervisorSignatureClass = cx({
    label: true,
    checkbox: true,
  });

  return (
    <form className={s.addTraining} onSubmit={uploadTraining}>
      {supervisor && !training && (
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
      <UploadFile
        isSubmitted={isSubmitted}
        photoUrl={training?.photoUrl}
        photoPath={training?.photoPath}
        apprenticeName={training?.apprenticeName || selectedApprentice?.name}
        month={month}
        year={year}
        onPhotoChange={handlePhotoChange}
        folder="trainings"
        showDelete={!training?.supervisorSignature}
      />
      {!supervisor && !training?.supervisorSignature && (
        <label className={signatureClass}>
          <input
            type="checkbox"
            onChange={() => setApprenticeSignature(!apprenticeSignature)}
          />
          <span>
            I hereby certify, to the best of my knowledge, that the training
            submitted is accurate and complete
          </span>
        </label>
      )}
      {supervisor && !training?.supervisorSignature && (
        <label className={supervisorSignatureClass}>
          <input
            type="checkbox"
            onChange={() => setSupervisorSignature(!supervisorSignature)}
          />
          <span className={s.supervisorApproval}>
            As a member Training Agent of the LRT Apprenticeship Program, I
            hereby certify, to the best of my knowledge, that the hours
            submitted are accurate and complete
          </span>
        </label>
      )}
      {training?.supervisorSignature && (
        <div className={s.approvalInfo}>
          Approved by {capitalizeName(supervisorData?.name)}{" "}
          {displayDate(training.dateCompleted)}
        </div>
      )}
      <div className={s.submitContainer}>
        {user?.role === "admin" && (
          <div className={s.deleteBtn} onClick={handleDeleteTraining}>
            Delete
          </div>
        )}
        {!training?.supervisorSignature && (
          <>
            <div></div>
            <input
              className={s.submitBtn}
              type="submit"
              value="Add Instruction"
            />
          </>
        )}
      </div>
    </form>
  );
};
