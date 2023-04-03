import { useAuth } from "../firebase/auth/auth.provider";
import s from "../styles/components/Header.module.scss";
import logo from "../assets/logo.png";
import { DisplayUser } from "./DisplayUser";

/* eslint-disable react/react-in-jsx-scope */
export const Header = () => {
  const { user } = useAuth();

  return (
    <div className={s.header}>
      <div className={s.company}>
        <img src={logo} alt="re-jatc" width={130} height={30} />
        <p className={s.companyName}>
          renewable energy joint apprenticeship & training committee
        </p>
      </div>
      {user && <DisplayUser />}
    </div>
  );
};
