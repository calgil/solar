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
  text: string;
  isSigned: boolean;
  mpr: MprType;
  supervisorId: string;
};
export const Signature = ({
  text,
  isSigned,
  mpr,
  supervisorId,
}: SignatureProps) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const iconClass = cx({
    iconContainer: true,
    success: isSigned,
    alert: !isSigned,
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
      <p>{text}</p>
      <div className={iconClass}>
        <img src={isSigned ? success : alert} alt="signature" />
      </div>
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
    </div>
  );
};
