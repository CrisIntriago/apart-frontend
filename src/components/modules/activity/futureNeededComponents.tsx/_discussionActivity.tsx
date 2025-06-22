import { Activity } from "@/types/learning_activity";
import React from "react";

interface DiscussionActivityProps {
  activityData: Activity;
  onComplete(): void;
}

const DiscussionActivity = ({ activityData, onComplete }: DiscussionActivityProps) => {
  return <div>Discussion Activity</div>;
};

export default DiscussionActivity;
