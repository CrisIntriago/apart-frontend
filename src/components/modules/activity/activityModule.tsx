'use client';

import { Activity, LearningActivityType } from "@/types/learning_activity";
import { lesson } from "@/constants/apiResponseTest";
import { onCompleteContentEventsHandler } from "@/utils/activityUtils";
import FillActivity from "./_fillActivity";
import MatchActivity from "./_matchActivity";

export default function ActivityModule({ id }: { id: string }) {

    //TO DO - Conseguir la data del backend
    const activityData: Activity | undefined = lesson.find(
        (item) => item.id === Number(id)
    );

    const handleActivityUpdate = () => (
        onCompleteContentEventsHandler()
    );

    const renderActivity = () => {
        if (!activityData) return <div>Actividad no encontrada</div>;
        switch (activityData.type) {
            case LearningActivityType.FILL:
                return <FillActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            case LearningActivityType.MATCH:
                return <MatchActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            //TODO: Other types following REQUIREMENTS asked by client
           
        }
    };

    return renderActivity();
}