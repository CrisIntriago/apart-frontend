"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface MatchActivityProps {
  activityData: Extract<Activity, { type: "matching" }>;
  onSubmit: (body: { pairs: Record<string, string> }) => void;
}

export default function MatchActivity({ activityData, onSubmit }: MatchActivityProps) {
  const [answers, setAnswers] = useState<string[]>(
    Array(activityData.payload.pairs.length).fill("")
  );

  const handleSubmit = () => {
    const formattedAnswers: Record<string, string> = {};
    answers.forEach((val, idx) => {
      formattedAnswers[activityData.payload.pairs[idx].left] = val;
    });
    onSubmit({ pairs: formattedAnswers });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3E3E3]">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center mb-2">{activityData.title}</h3>
        <p className="text-gray-700 text-center mb-6">{activityData.instructions}</p>
        <div className="w-full flex flex-col gap-4 mb-4">
          {activityData.payload.pairs.map((pair, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-32 font-semibold">{pair.left}</span>
              <input
                value={answers[index]}
                placeholder="Respuesta"
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className="border p-2 flex-1 rounded"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-white border-black border-2 text-black px-6 py-2 rounded-full font-semibold w-full"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}