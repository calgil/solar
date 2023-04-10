/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/Signature.module.scss";
import success from "../assets/success.png";
import alert from "../assets/alert.png";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

type SignatureProps = {
  text: string;
  isSigned: boolean;
};
export const Signature = ({ text, isSigned }: SignatureProps) => {
  const iconClass = cx({
    iconContainer: true,
    success: isSigned,
    alert: !isSigned,
  });
  return (
    <div className={s.signature}>
      <p>{text}</p>
      <div className={iconClass}>
        <img src={isSigned ? success : alert} alt="signature" />
      </div>
    </div>
  );
};
