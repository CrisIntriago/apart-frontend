import { Activity } from "@/types/learning_activity";
import React from "react";

interface VideoActivityProps {
  activityData: Activity;
  onComplete(): void;
}

const VideoActivity = ({ activityData, onComplete }: VideoActivityProps) => {
  return <div>Video Activity</div>;
};

export default VideoActivity;
