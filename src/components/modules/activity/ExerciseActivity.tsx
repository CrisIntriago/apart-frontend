import { Activity } from "@/types/learning_activity";
import React from "react";

interface ExerciseActivityProps {
  activityData: Activity;
  onComplete(): void;
}

const ExerciseActivity = ({ activityData, onComplete }: ExerciseActivityProps) => {
  return <div>Exercise Activity</div>;
};

export default ExerciseActivity;
