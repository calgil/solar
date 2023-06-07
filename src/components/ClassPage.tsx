/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/ClassPage.module.scss";
import { Class } from "../types/class.type";
import { getAllClasses } from "../firebase/courses/getAllClasses";
import { Modal } from "./Modal";
import { AddClass } from "./AddClass";
import { ClassCard } from "./ClassCard";
import { AddBtn } from "./AddBtn";

export const ClassPage = () => {
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [allClasses, setAllClasses] = useState<Class[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllClasses(setAllClasses);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className={s.action}>
        <AddBtn text="Add Class" onClick={() => setIsAddClassOpen(true)} />
      </div>
      <div className={s.classes}>
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
