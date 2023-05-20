/* eslint-disable react/react-in-jsx-scope */
import { REQUIRED_HOURS } from "../data/hourRequirements";
import { ProgressDisplay } from "./ProgressDisplay";

type TrainingOverviewProps = {
  totalHours: number;
};

export const TrainingOverview = ({ totalHours }: TrainingOverviewProps) => {
  return (
    <ProgressDisplay
      title="Certifications & Education"
      earned={totalHours}
      required={REQUIRED_HOURS.trainingTotal}
      main
    />
  );
};
