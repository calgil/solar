import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config";

export const deleteRecord = async (collection: string, id: string) => {
  try {
    const trainingRef = doc(db, collection, id);
    await deleteDoc(trainingRef);
  } catch (error) {
    console.error(error);
  }
};
