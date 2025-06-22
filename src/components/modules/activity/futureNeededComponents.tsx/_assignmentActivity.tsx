import { Activity } from "@/types/learning_activity";
import React from "react";

interface AssignmentActivityProps {
  activityData: Activity;
  onComplete(): void;
}

function AssignmentActivity({ activityData, onComplete }: AssignmentActivityProps) {
  return <div>Assignment Activity</div>;
}

export default AssignmentActivity;
