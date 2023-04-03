import { useRef, useState } from "react";
import s from "../styles/components/DisplayUser.module.scss";
import { useAuth } from "../firebase/auth/auth.provider";
import { useClickOutside } from "../hooks/useClickOutside";

/* eslint-disable react/react-in-jsx-scope */

export const DisplayUser = () => {
  const { logout, user } = useAuth();
  const [showActions, setShowActions] = useState<boolean>(false);
  const actionContainerRef = useRef<HTMLDivElement>(null);

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
      onClick={() => setShowActions(true)}
    >
      Hi, {user?.name}
      <button className={s.dropdownBtn}>^</button>
      {showActions && (
        <div className={s.actionsDropdown}>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  );
};
