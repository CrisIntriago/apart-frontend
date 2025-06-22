import { Activity } from "@/types/learning_activity";
import React from "react";

interface MatchActivityProps {
  activityData: Activity;
  onComplete(): void;
}

const MatchActivity = ({ activityData, onComplete }: MatchActivityProps) => {
  return <div>Video Activity</div>;
};

export default MatchActivity;
