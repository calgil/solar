/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/Education.module.scss";
import { Modal } from "./Modal";
import { getAllClasses } from "../firebase/courses/getAllClasses";
import { ClassCard } from "./ClassCard";
import { AddClass } from "./AddClass";
import { Class } from "../types/class.type";

export const Education = () => {
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [allClasses, setAllClasses] = useState<Class[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllClasses(setAllClasses);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <h3 className={s.courseTitle}>All Related Trainings</h3>
      <button className={s.filterBtn} onClick={() => setIsAddClassOpen(true)}>
        Add Class
      </button>
      <Modal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        title="Add Class"
      >
        <AddClass closeModal={() => setIsAddClassOpen(false)} />
      </Modal>
      <div className={s.courses}>
        {allClasses &&
          allClasses.map((training) => (
            <ClassCard key={training.id} training={training} edit />
          ))}
      </div>
    </div>
  );
};
