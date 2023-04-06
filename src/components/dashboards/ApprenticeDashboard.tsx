/* eslint-disable react/react-in-jsx-scope */
import s from "../../styles/components/ApprenticeDashboard.module.scss";
import { useAuth } from "../../firebase/auth/auth.provider";
import { useState } from "react";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { capitalizeName } from "../../utils/capitalizeName";
import { mprType } from "../../types/mpr.type";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { HoursOverview } from "../HoursOverview";
import { HoursDetails } from "../HoursDetails";

export const ApprenticeDashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const [userMprs, setUserMprs] = useState<mprType[]>([]);

  // TODO: move this to separate file

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

  const totalHours = userMprs.reduce((acc, mpr) => acc + mpr.totalHours, 0);
  const psHours = userMprs.reduce((acc, mpr) => acc + mpr.psHours, 0);
  const oresHours = userMprs.reduce((acc, mpr) => acc + mpr.resHours, 0);
  const bosHours = userMprs.reduce((acc, mpr) => acc + mpr.bosHours, 0);
  const otherHours = userMprs.reduce((acc, mpr) => acc + mpr.otherHours, 0);

  return (
    <div>
      <div className={s.overview}>
        <h2>{capitalizeName(user?.name)}&apos;s Dashboard</h2>
        <div className={s.totals}>
          <HoursOverview
            hours={{ totalHours, psHours, oresHours, bosHours, otherHours }}
          />
          {/* <div>Certs and Education</div> */}
          {/* <div>Test</div> */}
        </div>
      </div>
      <div className={s.details}>
        <HoursDetails
          apprenticeData={{
            totalHours,
            psHours,
            oresHours,
            bosHours,
            otherHours,
            mprs: userMprs,
          }}
          apprentice={true}
          btnClick={openModal}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Hours">
          {user && <AddHours user={user} />}
        </Modal>
        {/* <div className={s.hoursDetail}>
          Hours
          <button onClick={() => setIsModalOpen(true)}>Add hours</button>
          
        </div> */}
        {/* <div className={s.allMprs}>
          {userMprs.map((mpr) => (
            <div key={mpr.id}>
              <p>{mpr.date}</p>
              <p>{mpr.totalHours}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};
