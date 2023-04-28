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
  authorizedApproval: "supervisor" | "admin";
};
export const Signature = ({
  text,
  isSigned,
  mpr,
  authorizedApproval,
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

    if (user?.role !== authorizedApproval || user?.role !== "admin") {
      return;
    }
    setIsModalOpen(true);
    console.log("i want to be approved!");
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
            supervisor={authorizedApproval}
            mpr={mpr}
          />
        )}
      </Modal>
    </div>
  );
};
