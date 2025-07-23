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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
  <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row border border-gray-700">
    {/* Columna izquierda - Imagen */}
    <div className="w-full md:w-1/3 h-72 md:h-auto bg-gray-800 relative">
      <img
        src="https://picsum.photos/800/600?random=10"
        alt="Educational illustration"
        className="absolute inset-0 w-full h-full object-cover rounded-tl-xl rounded-bl-xl opacity-90"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://via.placeholder.com/800x600.png?text=Imagen+no+disponible";
        }}
      />
    </div>

    {/* Columna derecha - Contenido */}
    <div className="w-full md:w-2/3 p-8 flex flex-col">
      <h3 className="text-2xl font-bold text-white mb-2 text-center md:text-left">{activityData.title}</h3>
      <p className="text-gray-300 mb-4 text-center md:text-left">{activityData.instructions}</p>
      <p className="text-gray-400 mb-6 text-center md:text-left">{activityData.payload.text}</p>

      <div className="flex flex-col gap-4 mb-6">
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
            className="block border border-gray-600 bg-gray-800 text-white p-3 rounded w-full text-lg placeholder-gray-500"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-auto bg-white text-black px-6 py-2 rounded-full font-semibold border-2 border-white hover:bg-gray-200 transition w-full"
      >
        Sent
      </button>
    </div>
  </div>
</div>

  );
}