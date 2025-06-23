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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3E3E3]">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col items-center">
        <h3 className="text-2xl font-bold text-center mb-2">{activityData.title}</h3>
        <p className="text-gray-700 text-center mb-6">{activityData.instructions}</p>
        <div className="w-full flex flex-col gap-4">
          {activityData.payload.choices.map((choice) => (
            <button
              key={choice.id}
              className={`w-full py-3 rounded-lg border text-lg font-medium transition
                ${selected.includes(choice.id)
                  ? "bg-black text-white border-black hover:bg-gray-800"
                  : "bg-gray-100 text-gray-900 border-gray-300 hover:bg-blue-100"}
              `}
              onClick={() => handleSelect(choice.id)}
              type="button"
              disabled={!activityData.payload.is_multiple && selected.length > 0}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}