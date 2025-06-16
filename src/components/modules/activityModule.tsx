'use client';

import { Activity, LearningActivityType } from "@/types/learning_activity";
import { useEffect } from "react";
import { lesson } from "@/constants/apiResponseTest";
import ExerciseActivity from "./activity/ExerciseActivity";
import QuizActivity from "./activity/QuizActivity";
import VideoActivity from "./activity/VideoActivity";
import ReadingActivity from "./activity/ReadingActivity";
import AssignmentActivity from "./activity/AssignmentActivity";
import DiscussionActivity from "./activity/DiscussionActivity";


export default function ActivityModule({ id }: { id: string }) {


    // const { data: activityData, refetch } = learningActivityHooks.useGetOne({
    //     id,
    //     enabled: !!id,
    // })
    const activityData: Activity = lesson[0]; //TO-DO: Tienes que conseguir la data de la
    // actividad desde el backend

    useEffect(() => {
        if (activityData) {
        }
    }, [activityData])

    const handleActivityUpdate =  () => {

    }

    const renderActivity = () => {
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
    }

    return renderActivity();
}