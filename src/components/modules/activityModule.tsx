'use client';

import { Activity, LearningActivityType } from "@/types/learning_activity";
import { lesson } from "@/constants/apiResponseTest";
import ExerciseActivity from "./activity/ExerciseActivity";
import QuizActivity from "./activity/QuizActivity";
import VideoActivity from "./activity/VideoActivity";
import ReadingActivity from "./activity/ReadingActivity";
import AssignmentActivity from "./activity/AssignmentActivity";
import DiscussionActivity from "./activity/DiscussionActivity";

export default function ActivityModule({ id }: { id: string }) {
    
    //TO DO - Conseguir la data del backend
    const activityData: Activity | undefined = lesson.find(
        (item) => item.id === Number(id)
    );

    const handleActivityUpdate = () => {};

    const renderActivity = () => {
        if (!activityData) return <div>Actividad no encontrada</div>;
        switch (activityData.type) {
            case LearningActivityType.MULTIPLE_OPTION_IMAGE:
                return <ExerciseActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            case LearningActivityType.MULTIPLE_OPTION_INCOMPLETE_SENTENCE:
                return <QuizActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            case LearningActivityType.MULTIPLE_OPTION_THEORY:
                return <VideoActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            case LearningActivityType.MULTIPLE_OPTION_VOCABULARY:
                return <ReadingActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            case LearningActivityType.SHOW_RESULTS:
                return <AssignmentActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            case LearningActivityType.WRITTEN_RESPONSE:
                return <DiscussionActivity activityData={activityData} onComplete={handleActivityUpdate} />;
            default:
                return null;
        }
    };

    return renderActivity();
}