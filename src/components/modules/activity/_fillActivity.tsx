"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface FillActivityProps {
  activityData: Extract<Activity, { type: "fill_in" }>;
  onSubmit: (body: { answers: Record<string, string> }) => void;
}

export default function FillActivity({ activityData, onSubmit }: FillActivityProps) {
  const blanks = activityData.payload.text.match(/{{blank}}/g)?.length || 1;
  const [answers, setAnswers] = useState<string[]>(Array(blanks).fill(""));

  const handleSubmit = () => {
    const formattedAnswers: Record<string, string> = {};
    answers.forEach((val, idx) => {
      formattedAnswers[idx.toString()] = val;
    });
    onSubmit({ answers: formattedAnswers });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3E3E3]">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center mb-2">{activityData.title}</h3>
        <p className="text-gray-700 text-center mb-6">{activityData.instructions}</p>
        <p className="text-gray-700 text-center mb-6">{activityData.payload.text}</p>
        <div className="w-full flex flex-col gap-4 mb-4">
          {answers.map((val, i) => (
            <input
              key={i}
              value={val}
              placeholder={`Respuesta ${i + 1}`}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[i] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="block border p-3 rounded w-full text-lg"
            />
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