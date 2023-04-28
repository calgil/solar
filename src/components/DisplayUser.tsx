/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from "react";
import s from "../styles/components/DisplayUser.module.scss";
import { useAuth } from "../providers/auth.provider";
import { useClickOutside } from "../hooks/useClickOutside";
import { capitalizeName } from "../utils/capitalizeName";
import { DownArrow } from "./DownArrow";

// TODO: Fix dropdown styles

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
      onClick={() => setShowActions(!showActions)}
    >
      <p className={s.greeting}>Hi, {capitalizeName(user?.name)}</p>
      <DownArrow expand={showActions} />
      {showActions && (
        <div className={s.actionsDropdown}>
          <button className={s.actionBtn} onClick={() => logout()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
