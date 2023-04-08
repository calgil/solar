/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/Signature.module.scss";
import success from "../assets/success.png";
import alert from "../assets/alert.png";

type SignatureProps = {
  text: string;
  isSigned: boolean;
};
export const Signature = ({ text, isSigned }: SignatureProps) => {
  return (
    <div className={s.signature}>
      <p>{text}</p>
      <div className={s.iconContainer}>
        <img src={isSigned ? success : alert} alt="signature" />
      </div>
    </div>
  );
};
