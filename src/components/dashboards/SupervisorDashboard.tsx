/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../../styles/components/SupervisorDashboard.module.scss";
import { User } from "../../types/user.type";
import { fetchUsers } from "../../firebase/users/fetchUsers";
import { useAuth } from "../../providers/auth.provider";
import { StaffMember } from "../StaffMember";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { AddBtn } from "../AddBtn";
import { getApprenticeData } from "../../firebase/mpr/getApprenticeData";
import { ApprenticeMprData } from "../../hooks/useStaffData";

export const SupervisorDashboard = () => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apprentices, setApprentices] = useState<User[]>([]);
  const [apprenticeData, setApprenticeData] = useState<ApprenticeMprData[]>([]);

  const closeModal = () => setIsModalOpen(false);

  const getApprentices = async () => {
    if (!user) {
      return;
    }
    const apprentices = await fetchUsers("apprentice", user.id);
    setApprentices(apprentices);
    const apprenticeIds = new Set(apprentices.map((app) => app.id));
    console.log({ apprenticeIds });

    const apprenticeDataPromise = Array.from(apprenticeIds).map(async (id) => {
      const data = await getApprenticeData(id);
      const apprenticeId = data.mprs[0].apprenticeId;
      const name = data.mprs[0].apprenticeName;
      const hasUnapprovedMpr = data.mprs.some(
        (mpr) => !mpr.supervisorSignature
      );
      return { apprenticeId, name, data, hasUnapprovedMpr };
    });

    const data = await Promise.all(apprenticeDataPromise);

    setApprenticeData(data);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getApprentices();
  }, [user]);

  return (
    <div className={s.apprenticeSummary}>
      <h2 className={s.title}>Apprentice Summary</h2>
      <div className={s.action}>
        <AddBtn text="Add Hours" onClick={() => setIsModalOpen(true)} />
      </div>
      {/* Figure out how to use useStaffData to get data and pass to this component */}
      <div className={s.apprenticeContainer}>
        {apprenticeData.map((app) => (
          <StaffMember key={app.apprenticeId} data={app} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Apprentice Hours"
      >
        {user && (
          <AddHours
            user={user}
            closeModal={closeModal}
            supervisor="supervisor"
            apprentices={apprentices}
          />
        )}
      </Modal>
    </div>
  );
};
