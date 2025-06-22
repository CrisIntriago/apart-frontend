'use client'

import ActivityModule from "@/components/modules/activity/activityModule"

export default function ActivityPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div className="flex-grow container mx-auto flex overflow-hidden">
      {/* <ActivityModule id={id} /> */}
    </div>
  );
}
