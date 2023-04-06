/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import s from "../styles/components/Modal.module.scss";
import close from "../assets/close.png";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    containerRef: modalRef,
    onClickOutside: onClose,
    dependencies: [onClose],
  });
  if (!isOpen) return null;
  return (
    <div className={s.modalOverlay}>
      <div ref={modalRef} className={s.modal}>
        <div className={s.modalHeader}>
          <h4 className={s.title}>{title}</h4>
          <button className={s.closeBtn} onClick={onClose}>
            <div className={s.close}>
              <img src={close} alt="close" />
            </div>
          </button>
        </div>
        <div className={s.modalBody}>{children}</div>
      </div>
    </div>
  );
};
