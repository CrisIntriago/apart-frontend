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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
  <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row border border-gray-700">
    <div className="w-full md:w-1/3 h-72 md:h-auto bg-gray-800 relative">
      <img
        src="https://picsum.photos/800/600?random=4"
        alt="Match pairs activity"
        className="absolute inset-0 w-full h-full object-cover rounded-tl-xl rounded-bl-xl opacity-90"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://via.placeholder.com/800x600.png?text=Imagen+no+disponible";
        }}
      />
    </div>

    <div className="w-full md:w-2/3 p-8 flex flex-col">
      <h3 className="text-2xl font-bold text-white mb-2 text-center md:text-left">{activityData.title}</h3>
      <p className="text-gray-300 mb-6 text-center md:text-left">{activityData.instructions}</p>

      <div className="flex flex-col gap-4 mb-6">
        {activityData.payload.pairs.map((pair, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-40 text-white font-semibold">{pair.left}</span>
            <input
              value={answers[index]}
              placeholder="Respuesta"
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded flex-1 placeholder-gray-400"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-auto bg-white text-black px-6 py-2 rounded-full font-semibold border-2 border-white hover:bg-gray-200 transition w-full"
      >
        Send
      </button>
    </div>
  </div>
</div>

  );
}