'use client';

import { Activity, LearningActivityType } from "@/types/learning_activity";
import { act, useEffect } from "react";
import {lesson} from "@/constants/apiResponseTest";


export default function ActivityModule() {


    // const { data: activityData, refetch } = learningActivityHooks.useGetOne({
    //     id,
    //     enabled: !!id,
    // })
    const activityData: Activity = lesson[0];

    useEffect(() => {
        if (activityData) {
        }
    }, [activityData])

    const handleActivityUpdate = async (activityId: string) => {

    }

    const renderActivity = () => {
        switch (activityData.type) {
            case LearningActivityType.MULTIPLE_OPTION_IMAGE:
                return <div>Exercise Activity</div>;
            case LearningActivityType.MULTIPLE_OPTION_INCOMPLETE_SENTENCE:
                return <div>Quiz Activity</div>;
            case LearningActivityType.MULTIPLE_OPTION_THEORY:
                return <div>Video Activity</div>;
            case LearningActivityType.MULTIPLE_OPTION_VOCABULARY:
                return <div>Reading Activity</div>;
            case LearningActivityType.SHOW_RESULTS:
                return <div>Assignment Activity</div>;
            case LearningActivityType.WRITTEN_RESPONSE:
                return <div>Discussion Activity</div>;
            default:
                return null
        }
    }

    return renderActivity();
}