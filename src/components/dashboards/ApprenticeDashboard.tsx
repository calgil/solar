import s from "../../styles/components/ApprenticeDashboard.module.scss";
import { useAuth } from "../../firebase/auth/auth.provider";
import { useState } from "react";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { capitalizeName } from "../../utils/capitalizeName";
import { mprType } from "../../types/mpr.type";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

/* eslint-disable react/react-in-jsx-scope */
export const ApprenticeDashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const [userMprs, setUserMprs] = useState<mprType[]>([]);

  const fetchMprs = async () => {
    const mprsQuery = query(
      collection(db, "mprs"),
      where("userId", "==", user?.id)
    );
    const unsubscribe = onSnapshot(mprsQuery, (mprsSnapshot) => {
      const mprsData = mprsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as mprType[];
      setUserMprs(mprsData);
    });
    return () => unsubscribe;
  };

  if (user?.id && !userMprs.length) {
    const unsubscribePromise = fetchMprs();
    unsubscribePromise.then((unsubscribe) => {
      return () => {
        unsubscribe();
      };
    });
  }

  return (
    <div>
      <div className={s.overview}>
        <h2>{capitalizeName(user?.name)}&apos;s Dashboard</h2>
        <div className={s.totals}>
          <div>Hours</div>
          <div>Certs and Education</div>
          <div>Test</div>
        </div>
      </div>
      <div className={s.details}>
        <div className={s.hoursDetail}>
          Hours
          <button onClick={() => setIsModalOpen(true)}>Add hours</button>
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Hours">
            {user && <AddHours user={user} />}
          </Modal>
        </div>
        <div className={s.allMprs}>
          {userMprs.map((mpr) => (
            <div key={mpr.id}>
              <p>{mpr.date}</p>
              <p>{mpr.totalHours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
