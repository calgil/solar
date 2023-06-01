import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config";
import { Class } from "./addClass";

export const getAllClasses = (
  setClassData: (classes: Class[] | null) => void
) => {
  const coursesQuery = query(collection(db, "classes"), orderBy("name"));

  const unsubscribe = onSnapshot(coursesQuery, (coursesSnapshot) => {
    const classes = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Class[];
    if (classes.length === 0) {
      return setClassData(null);
    }
    setClassData(classes);
  });
  return unsubscribe;
};
