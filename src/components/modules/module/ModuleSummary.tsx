"use client";

import { Activity } from "@/types/learning_activity";
import ModuleActivityCard from "./ModuleActivityCard";

interface Props {
  results: { is_correct: boolean }[];
  activities: Activity[];
  onBack: () => void;
}

export default function ModuleSummary({ results, activities, onBack }: Props) {
  const correctCount = results.filter((r) => r.is_correct).length;

  return (
    <div className="w-full max-w-3xl mx-auto my-10 p-6 bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Resumen del módulo</h2>
      <p className="text-lg mb-6 text-gray-700 font-medium">
        Puntaje: {correctCount} / {results.length}
      </p>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <ModuleActivityCard
            key={activity.id}
            index={index}
            isCorrect={results[index].is_correct}
          />
        ))}
      </ul>
      <button
        onClick={onBack}
        className="mt-6 px-6 py-3 bg-white text-black border border-black rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Volver al Dashboard
      </button>
    </div>
  );
}
