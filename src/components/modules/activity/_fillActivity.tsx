"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface FillActivityProps {
  activityData: Extract<Activity, { type: "fill_in" }>;
  onSubmit: (body: { answers: Record<string, string> }) => void;
}

export default function FillActivity({
  activityData,
  onSubmit,
}: FillActivityProps) {
  const blanks = activityData.payload.text.match(/{{blank}}/g)?.length || 1;
  const [answers, setAnswers] = useState<string[]>(Array(blanks).fill(""));
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const hasEmpty = answers.some((a) => a.trim() === "");
    console.log("Submitted answers:", answers);
    if (hasEmpty) {
      setError(true);
      return;
    }

    setError(false);
    const formattedAnswers: Record<string, string> = {};
    answers.forEach((val, idx) => {
      formattedAnswers[idx.toString()] = val.trim();
    });
    onSubmit({ answers: formattedAnswers });
  };

  let blankCounter = 0;
  const displayText = activityData.payload.text.replace(/{{blank}}/g, () => {
    blankCounter++;
    return `_____ [${blankCounter}]`;
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        {activityData.title}
      </h3>
      <p className="text-gray-700 mb-4 text-center">
        {activityData.instructions}
      </p>
      <p className="text-gray-600 mb-6 text-center whitespace-pre-line">
        {displayText}
      </p>

      <div className="flex flex-col gap-4 mb-4 items-center">
        {answers.map((val, i) => (
          <div key={i} className="w-2/3 flex flex-col">
            <input
              value={val}
              placeholder={`Respuesta ${i + 1}`}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[i] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="border border-gray-400 bg-white text-gray-800 p-3 rounded-md text-base placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-center font-medium mb-4">
          Por favor completa todos los campos antes de continuar.
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="w-1/3 mx-auto block bg-white text-black border border-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
      >
        Enviar
      </button>
    </div>
  );
}
