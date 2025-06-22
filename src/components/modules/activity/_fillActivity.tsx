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
    <div>
      <p>{activityData.title}</p>
      <p>{activityData.instructions}</p>
      <p>{activityData.payload.text.replaceAll("{{blank}}", "_____")}</p>
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
          className="block border p-2 my-2 w-full"
        />
      ))}
      <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </div>
  );
}
