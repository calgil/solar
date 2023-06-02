import { doc, getDoc } from "firebase/firestore";
import { Class } from "../../types/class.type";
import { db } from "../config";

export const getClassById = async (classId: string): Promise<Class | null> => {
  try {
    const classRef = doc(db, "classes", classId);
    const classSnap = await getDoc(classRef);

    if (classSnap.exists()) {
      return { id: classSnap.id, ...classSnap.data() } as Class;
    }
    return null;
  } catch (error) {
    console.error("Error getting class by ID:", error);
    throw new Error("Failed to get class");
  }
};
