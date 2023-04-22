/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/Signature.module.scss";
import success from "../assets/success.png";
import alert from "../assets/alert.png";
import classNames from "classnames/bind";
import { useState } from "react";
import { Modal } from "./Modal";
import { useAuth } from "../firebase/auth/auth.provider";
import { MprType } from "../types/mpr.type";

const cx = classNames.bind(s);

type SignatureProps = {
  text: string;
  isSigned: boolean;
  mpr: MprType;
};
export const Signature = ({ text, isSigned, mpr }: SignatureProps) => {
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
    if (user?.role === "apprentice" || mpr.supervisorSignature) {
      return;
    }

    setIsModalOpen(true);
    // console.log("i wan tto be approved!");
  };
  return (
    <div className={s.signature} onClick={handleApproval}>
      <p>{text}</p>
      <div className={iconClass}>
        <img src={isSigned ? success : alert} alt="signature" />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Approve MPR">
        <div>
          Hours! <br />
          {mpr.id}
        </div>
      </Modal>
    </div>
  );
};
