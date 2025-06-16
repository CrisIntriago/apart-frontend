import { Activity } from "@/types/learning_activity";
import React from "react";

interface ReadingActivityProps {
  activityData: Activity;
  onComplete(): void;
}

const ReadingActivity = ({ activityData, onComplete }: ReadingActivityProps) => {
  return <div>Reading Activity</div>;
};

export default ReadingActivity;
