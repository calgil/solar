/* eslint-disable react/react-in-jsx-scope */
import s from "../../styles/components/ApprenticeDashboard.module.scss";
import { useAuth } from "../../firebase/auth/auth.provider";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { capitalizeName } from "../../utils/capitalizeName";
import { MprType } from "../../types/mpr.type";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { HoursOverview } from "../HoursOverview";
import { HoursDetails } from "../HoursDetails";
import { fetchMprs } from "../../firebase/mpr/getApprenticeMprs";

export const ApprenticeDashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const [userMprs, setUserMprs] = useState<MprType[]>([]);

  useEffect(() => {
    if (user?.id) {
      const unsubscribe = fetchMprs(user.id, setUserMprs);
      return () => unsubscribe();
    }
  }, [user?.id]);

  const totalHours = userMprs.reduce((acc, mpr) => acc + mpr.totalHours, 0);
  const psHours = userMprs.reduce((acc, mpr) => acc + mpr.psHours, 0);
  const oresHours = userMprs.reduce((acc, mpr) => acc + mpr.oresHours, 0);
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
