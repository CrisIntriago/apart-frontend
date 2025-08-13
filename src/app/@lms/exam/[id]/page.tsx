"use client";

import ExamModule from "@/components/modules/authentication/exam/examModule";

export default function ExamPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex-grow container mx-auto flex overflow-hidden">
      <ExamModule id={id} />
    </div>
  );
}
