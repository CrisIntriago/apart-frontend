"use client";

import { Activity } from "@/types/learning_activity";
import { useState } from "react";

interface ChoiceActivityProps {
  activityData: Extract<Activity, { type: "choice" }>;
  onSubmit: (body: { selected_ids: number[] }) => void;
}

export default function ChoiceActivity({ activityData, onSubmit }: ChoiceActivityProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    let newSelected: number[];
    if (activityData.payload.is_multiple) {
      newSelected = selected.includes(id)
        ? selected.filter((val) => val !== id)
        : [...selected, id];
      setSelected(newSelected);
    } else {
      newSelected = [id];
      setSelected(newSelected);
      onSubmit({ selected_ids: newSelected });
    }
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onSubmit({ selected_ids: selected });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{activityData.title}</h3>
      <p className="text-gray-700 mb-6 text-center">{activityData.instructions}</p>

      <div className="flex flex-col gap-4 mb-6">
        {activityData.payload.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleSelect(choice.id)}
            disabled={!activityData.payload.is_multiple && selected.length > 0}
            type="button"
            className={`w-2/3 mx-auto py-3 px-4 rounded-lg border text-base font-medium transition-all
              ${
                selected.includes(choice.id)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
              }`}
          >
            {choice.text}
          </button>
        ))}
      </div>

      {activityData.payload.is_multiple && (
        <button
          onClick={handleSubmit}
          className="w-1/3 mx-auto block bg-white text-black border border-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Enviar
        </button>
      )}
    </div>
  );
}
