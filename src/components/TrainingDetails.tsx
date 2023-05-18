/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/TrainingDetails.module.scss";
import { DownArrow } from "./DownArrow";
import { TrainingData } from "../firebase/courses/fetchApprenticeTrainingData";
import { REQUIRED_HOURS } from "../data/hourRequirements";
import { HourCategory } from "./HourCategory";
import "firebase/compat/firestore";
import { TrainingDisplay } from "./TrainingDisplay";

type TrainingDetailsProps = {
  data: TrainingData;
};

export const TrainingDetails = ({ data }: TrainingDetailsProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [numCoursesToShow, setNumCoursesToShow] = useState(3);

  const handleExpandClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  const handleSeeMoreClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setNumCoursesToShow(data.trainings.length);
  };

  const handleShowLessClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setNumCoursesToShow(3);
  };

  return (
    <div className={s.detailsContainer}>
      <div className={s.collapsedView} onClick={handleExpandClick}>
        <div className={s.info}>
          <h3 className={s.title}>Certifications & Education</h3>
          <p className={s.totalHours}>
            {data.totalHours}/{REQUIRED_HOURS.trainingTotal}
          </p>
          <div className={s.hourContainer}>
            <HourCategory
              category="Education"
              hoursEarned={data.totalHours}
              totalHours={REQUIRED_HOURS.trainingTotal}
              showPercentage
            />
          </div>
        </div>
        <div className={s.actions}>
          <DownArrow expand={showDetails} />
        </div>
      </div>
      {showDetails && (
        <div className={s.courseContainer}>
          {data.trainings.slice(0, numCoursesToShow).map((training) => (
            <TrainingDisplay key={training.id} training={training} />
          ))}
          {data.trainings.length > numCoursesToShow && (
            <div className={s.courseQuantity} onClick={handleSeeMoreClick}>
              See more...
            </div>
          )}
          {data.trainings.length > 3 &&
            data.trainings.length === numCoursesToShow && (
              <div className={s.courseQuantity} onClick={handleShowLessClick}>
                Show Less
              </div>
            )}
        </div>
      )}
    </div>
  );
};
