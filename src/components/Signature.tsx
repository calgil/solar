/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/Signature.module.scss";
import success from "../assets/success.png";
import alert from "../assets/alert.png";
import classNames from "classnames/bind";
import { useAuth } from "../providers/auth.provider";

const cx = classNames.bind(s);

type SignatureProps = {
  isApproved: boolean;
  openModal: () => void;
  apprenticeId: string;
  supervisorId: string;
};
export const Signature = ({
  isApproved,
  apprenticeId,
  supervisorId,
  openModal,
}: SignatureProps) => {
  const { user } = useAuth();

  const iconClass = cx({
    iconContainer: true,
    success: isApproved,
    alert: !isApproved,
  });

  const handleApproval = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (user?.role === "admin") {
      return openModal();
    }
    if (user?.id === apprenticeId && isApproved) {
      return openModal();
    }

    if (user?.id !== supervisorId) {
      return;
    }
  };
  return (
    <div className={s.signature} onClick={handleApproval}>
      <p>{isApproved ? "Approved" : "Awaiting Approval"}</p>
      <div className={iconClass}>
        <img src={isApproved ? success : alert} alt="signature" />
      </div>
    </div>
  );
};
