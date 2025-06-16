import { Activity } from "@/types/learning_activity";
import React from "react";

interface QuizActivityProps {
  activityData: Activity;
  onComplete(): void;
}

const QuizActivity = ({ activityData, onComplete }: QuizActivityProps) => {
  return <div>Quiz Activity</div>;
};

export default QuizActivity;
