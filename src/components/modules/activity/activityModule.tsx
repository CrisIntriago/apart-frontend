"use client";

import { Activity, LearningActivityType } from "@/types/learning_activity";
import FillActivity from "./_fillActivity";
import MatchActivity from "./_matchActivity";
import OrderActivity from "./_orderActivity";
import ChoiceActivity from "./_choiceActivity";

interface ActivityModuleProps {
  activityData: Activity;
  onSubmit: (body: any) => void;
}

function ActivityModule({ activityData, onSubmit }: ActivityModuleProps) {
  const renderActivity = () => {
    switch (activityData.type) {
      case LearningActivityType.FILL:
        return <FillActivity activityData={activityData} onSubmit={onSubmit} />;
      case LearningActivityType.MATCH:
        return <MatchActivity activityData={activityData} onSubmit={onSubmit} />;
      case LearningActivityType.ORDER:
        return <OrderActivity activityData={activityData} onSubmit={onSubmit} />;
      case LearningActivityType.CHOICE:
        return <ChoiceActivity activityData={activityData} onSubmit={onSubmit} />;
      default:
        return <div>Tipo de actividad no soportado aún.</div>;
    }
  };

  return <div>{renderActivity()}</div>;
}

export default ActivityModule;
