import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const displayDate = (
  timestamp: firebase.firestore.Timestamp
): string => {
  const date = timestamp.toDate();
  const formattedDate = date
    .toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
    .replace(/(\w+) (\d{4})/g, "$1, $2");
  return formattedDate;
};
