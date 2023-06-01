import { useEffect, useState } from "react";
import s from "../styles/components/RequirementsPage.module.scss";
import { Class } from "../types/class.type";
import { getAllClasses } from "../firebase/courses/getAllClasses";
import { Modal } from "./Modal";
import { AddClass } from "./AddClass";
import { ClassCard } from "./ClassCard";

/* eslint-disable react/react-in-jsx-scope */
export const RequirementsPage = () => {
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [allClasses, setAllClasses] = useState<Class[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllClasses(setAllClasses);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <button className={s.filterBtn} onClick={() => setIsAddClassOpen(true)}>
        Add Class
      </button>
      <div>
        {allClasses &&
          allClasses.map((training) => (
            <ClassCard key={training.id} training={training} />
          ))}
      </div>
      <Modal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        title="Add Class"
      >
        <AddClass closeModal={() => setIsAddClassOpen(false)} />
      </Modal>
    </div>
  );
};
