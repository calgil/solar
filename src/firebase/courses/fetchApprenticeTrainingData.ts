export type TrainingData = {
  totalHours: number;
  trainings: Training[];
};

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config";
import { Training } from "../../types/training.type";

export const fetchApprenticeTrainingData = (
  apprenticeId: string,
  setApprenticeTrainings: (data: TrainingData | null) => void
) => {
  const trainingQuery = query(
    collection(db, "trainings"),
    where("apprenticeId", "==", apprenticeId),
    orderBy("dateCompleted", "desc")
  );

  const unsubscribe = onSnapshot(trainingQuery, async (trainingSnapshot) => {
    const trainings = trainingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Training[];
    if (trainings.length === 0) {
      return setApprenticeTrainings(null);
    }
    const trainingsWithHoursPromises = trainings.map(async (training) => {
      const classDoc = await getDoc(doc(db, "classes", training.classId));
      const classData = classDoc.data();
      const hours = classData ? classData.hours : 0;

      console.log({ training });

      return {
        ...training,
        hours,
      };
    });

    const trainingsWithHours = await Promise.all(trainingsWithHoursPromises);

    const totalHours = trainingsWithHours.reduce(
      (acc, training) => acc + training.hours,
      0
    );

    const apprenticeTrainingData: TrainingData = {
      totalHours,
      trainings,
    };

    setApprenticeTrainings(apprenticeTrainingData);
  });
  return unsubscribe;
};

export const getApprenticeCourses = async (apprenticeId: string) => {
  const trainingQuery = query(
    collection(db, "trainings"),
    where("apprenticeId", "==", apprenticeId)
  );

  const trainingsSnapshot = await getDocs(trainingQuery);

  const trainings = trainingsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Training[];

  return trainings;
};
