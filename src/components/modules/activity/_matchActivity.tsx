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
  console.log("Submitting answers:", formattedAnswers);
  onSubmit({ pairs: formattedAnswers });
};

  return (
    <div>
      <h3>{activityData.title}</h3>
      <p>{activityData.instructions}</p>
      <div className="space-y-4 mt-4">
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
              className="border p-2 flex-1"
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </div>
  );
}
