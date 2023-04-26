/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/AddBtn.module.scss";
import plus from "../assets/plus.png";

type AddBtnProps = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const AddBtn = ({ text, onClick }: AddBtnProps) => {
  return (
    <button className={s.addBtn} onClick={onClick}>
      <div className={s.plus}>
        <img className={s.plusImg} src={plus} alt="plus" />
      </div>
      {text}
    </button>
  );
};
