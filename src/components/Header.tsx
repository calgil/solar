import { useAuth } from "../providers/auth.provider";
import s from "../styles/components/Header.module.scss";
import logo from "../assets/logo.png";
import { DisplayUser } from "./DisplayUser";
import { Link } from "react-router-dom";

/* eslint-disable react/react-in-jsx-scope */
export const Header = () => {
  const { user } = useAuth();

  return (
    <div className={s.header}>
      <Link to="/" className={s.link}>
        <div className={s.company}>
          <img src={logo} alt="re-jatc" width={130} height={30} />
          <p className={s.companyName}>
            renewable energy joint apprenticeship & training committee
          </p>
        </div>
      </Link>
      {user && <DisplayUser />}
    </div>
  );
};
