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
import { Training } from "../../types/training.type";
import { Class } from "../../types/class.type";

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

    const approvedTrainings = trainings.filter(
      (training) => training.supervisorSignature
    );

    const trainingsWithHoursPromises = approvedTrainings.map(
      async (training) => {
        const classQuery = query(
          collection(db, "classes"),
          where(
            "classRequirements",
            "array-contains",
            training.courseCompleted.id
          )
        );
        const classSnapshot = await getDocs(classQuery);
        const classes = classSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Class[];

        console.log({ classes });

        const hours = classes.reduce(
          (totalHours, classData) => totalHours + classData.hours,
          0
        );

        return {
          ...training,
          hours,
        };
      }
    );

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
