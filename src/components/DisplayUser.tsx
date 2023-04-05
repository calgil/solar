import { useRef, useState } from "react";
import s from "../styles/components/DisplayUser.module.scss";
import { useAuth } from "../firebase/auth/auth.provider";
import { useClickOutside } from "../hooks/useClickOutside";
import classNames from "classnames/bind";
import { capitalizeName } from "../utils/capitalizeName";

const cx = classNames.bind(s);

/* eslint-disable react/react-in-jsx-scope */

export const DisplayUser = () => {
  const { logout, user } = useAuth();
  const [showActions, setShowActions] = useState<boolean>(false);
  const actionContainerRef = useRef<HTMLDivElement>(null);

  const btnClass = cx({
    dropdownBtn: true,
    down: !showActions,
  });

  useClickOutside({
    containerRef: actionContainerRef,
    dependencies: [setShowActions, actionContainerRef],
    onClickOutside: () => {
      setShowActions(false);
    },
  });

  return (
    <div
      ref={actionContainerRef}
      className={s.actionContainer}
      onClick={() => setShowActions(!showActions)}
    >
      Hi, {capitalizeName(user?.name)}
      <button className={btnClass}>^</button>
      {showActions && (
        <div className={s.actionsDropdown}>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  );
};
