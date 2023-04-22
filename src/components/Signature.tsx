/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/Signature.module.scss";
import success from "../assets/success.png";
import alert from "../assets/alert.png";
import classNames from "classnames/bind";
import { useState } from "react";
import { Modal } from "./Modal";

const cx = classNames.bind(s);

type SignatureProps = {
  text: string;
  isSigned: boolean;
};
export const Signature = ({ text, isSigned }: SignatureProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const iconClass = cx({
    iconContainer: true,
    success: isSigned,
    alert: !isSigned,
  });

  const handleApproval = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
    console.log("i wan tto be approved!");
  };
  return (
    <div className={s.signature} onClick={handleApproval}>
      <p>{text}</p>
      <div className={iconClass}>
        <img src={isSigned ? success : alert} alt="signature" />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Approve MPR">
        <div>Hours!</div>
      </Modal>
    </div>
  );
};
