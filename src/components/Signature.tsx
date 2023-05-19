/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/Signature.module.scss";
import success from "../assets/success.png";
import alert from "../assets/alert.png";
import classNames from "classnames/bind";
import { useState } from "react";
import { Modal } from "./Modal";
import { useAuth } from "../providers/auth.provider";
import { MprType } from "../types/mpr.type";
import { AddHours } from "./AddHours";

const cx = classNames.bind(s);

type SignatureProps = {
  isApproved: boolean;
  mpr?: MprType;
  supervisorId?: string;
};
export const Signature = ({
  isApproved,
  mpr,
  supervisorId,
}: SignatureProps) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const iconClass = cx({
    iconContainer: true,
    success: isApproved,
    alert: !isApproved,
  });

  const handleApproval = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (user?.role === "admin") {
      return setIsModalOpen(true);
    }

    if (user?.id !== supervisorId) {
      return;
    }
    setIsModalOpen(true);
  };
  return (
    <div className={s.signature} onClick={handleApproval}>
      <p>{isApproved ? "Approved" : "Awaiting Approval"}</p>
      <div className={iconClass}>
        <img src={isApproved ? success : alert} alt="signature" />
      </div>
      {mpr && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`Approve ${mpr.apprenticeName}'s MPR`}
        >
          {user && (
            <AddHours
              user={user}
              closeModal={closeModal}
              supervisor="supervisor"
              mpr={mpr}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
