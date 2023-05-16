export type TrainingData = {
  totalHours: number;
  trainings: Training[];
};

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config";
import { Training } from "../training/addTrainingToDB";

export const fetchApprenticeTrainingData = (
  apprenticeId: string,
  setApprenticeTrainings: (data: TrainingData | null) => void
) => {
  const trainingQuery = query(
    collection(db, "trainings"),
    where("apprenticeId", "==", apprenticeId),
    orderBy("dateCompleted", "desc")
  );

  const unsubscribe = onSnapshot(trainingQuery, (trainingSnapshot) => {
    const trainings = trainingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Training[];
    if (trainings.length === 0) {
      setApprenticeTrainings(null);
    }

    const totalHours = trainings.reduce(
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
